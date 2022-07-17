import { useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import Swal from 'sweetalert2';

import initializeFirebase from './Firebase';
import { useRouter } from "next/router";
import { useState } from "react";
// initialize firebase app
initializeFirebase();

const useFirebase = () => {
    const router = useRouter();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    // Handle google login
    const signInWithGoogle = () => {
        setLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                setUser(result.user)
                setLoading(false)
                router.push("/")
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message} `,

                })
            })
            .finally(() => setLoading(false));
    };

    // handle register with email password or name
    const registerUser = (email, Password, name) => {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, Password)
            .then(() => {
                const newUser = { email, displayName: name };
                setUser(newUser);
                setLoading(false)

                //Update Profile
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                }).catch((error) => {
                    setAuthError(error.message);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${error.message} `,
                    })
                });

                router.push("/")
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message} `,

                })
            })
            .finally(() => setLoading(false));
    };

    // handle login with email and password
    const loginUser = (email, password) => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                setUser(user)
                setLoading(false);
                router.push("/")
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message} `,
                })
            })
            .finally(() => setLoading(false));
    };

    // Log out user 
    const logOut = () => {
        signOut(auth).then(() => {
            router.push("/")
        }).catch((error) => {
            console.log(error.message);
        })
            .finally(() => setLoading(false));
    };

    // firebase observer user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser({})
            }
        })
        return () => unsubscribe;
    }, [auth]);

    return {
        signInWithGoogle, logOut, registerUser, loginUser, user, loading
    }
};

export default useFirebase;