import { useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, } from "firebase/auth";
import Swal from 'sweetalert2';
import { handleSignInWithGoogle, handleLoading } from '../../../redux/Slices/AuthSlice';
import { useDispatch } from 'react-redux';

import initializeFirebase from './Firebase';
// initialize firebase app
initializeFirebase();

const useFirebase = () => {
    const dispatch = useDispatch();
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    // Handle google login
    const signInWithGoogle = (location, navigate) => {
        dispatch(handleLoading(true));
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                dispatch(handleSignInWithGoogle(result.user))
                dispatch(handleLoading(false));
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => dispatch(handleLoading(false)));
    };

    // handle register with email password or name
    const registerUser = (email, Password, name) => {
        createUserWithEmailAndPassword(auth, email, Password)
            .then(() => {
                dispatch(handleSignInWithGoogle({ email, displayName: name }))
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => dispatch(handleLoading(false)));
    };

    // handle login with email and password
    const loginUser = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                dispatch(handleSignInWithGoogle(user))
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => dispatch(handleLoading(false)));
    };

    // Log out user 
    const logOut = () => {
        signOut(auth).then(() => {

        }).catch((error) => {
            console.log(error.message);
        })
            .finally(() => dispatch(handleLoading(false)));
    };

    // firebase observer user state
    useEffect(() => {
        dispatch(handleLoading(true))
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(handleSignInWithGoogle(user))
            } else {
                dispatch(handleSignInWithGoogle({}))
            }
            dispatch(handleLoading(false))
        })
        return () => unsubscribe;
    }, [auth, dispatch]);

    return {
        signInWithGoogle, logOut, registerUser, loginUser,
    }
};

export default useFirebase;