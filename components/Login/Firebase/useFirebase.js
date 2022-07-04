import { useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, } from "firebase/auth";
import Swal from 'sweetalert2';
import { handleSignedInUser, handleLoading } from '../../../redux/Slices/AuthSlice';
import { useDispatch } from 'react-redux';

import initializeFirebase from './Firebase';
import { useRouter } from "next/router";
// initialize firebase app
initializeFirebase();

const useFirebase = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    // Handle google login
    const signInWithGoogle = (location, navigate) => {
        dispatch(handleLoading(true));
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                dispatch(handleSignedInUser(result.user))
                dispatch(handleLoading(false));
                router.push("/")
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message} `,

                })
            })
            .finally(() => dispatch(handleLoading(false)));
    };

    // handle register with email password or name
    const registerUser = (email, Password, name) => {
        createUserWithEmailAndPassword(auth, email, Password)
            .then(() => {
                dispatch(handleSignedInUser({ email, displayName: name }))
                router.push("/")
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message} `,

                })
            })
            .finally(() => dispatch(handleLoading(false)));
    };

    // handle login with email and password
    const loginUser = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                dispatch(handleSignedInUser(user))
                router.push("/")
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message} `,

                })
            })
            .finally(() => dispatch(handleLoading(false)));
    };

    // Log out user 
    const logOut = () => {
        signOut(auth).then(() => {
            router.push("/")
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
                dispatch(handleSignedInUser(user))
            } else {
                dispatch(handleSignedInUser({}))
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