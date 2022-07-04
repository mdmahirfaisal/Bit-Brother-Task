import { useRouter } from 'next/router';
import React from 'react';
import useFirebase from '../Firebase/useFirebase';
import { useForm } from "react-hook-form";
import NavigationBar from '../../Home/NavigationBar/NavigationBar';

const Login = () => {
    const router = useRouter();
    const { signInWithGoogle, loginUser } = useFirebase();
    const { register, handleSubmit, reset } = useForm();
    const onLoginSubmit = data => {
        console.log(data)
        loginUser(data.userEmail, data.userPassword)
        reset()
    };

    return (
        <div className="w-[100%] md:h-[100vh]">
            <NavigationBar />
            <div className="container px-6 py-12 h-full">
                <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                    <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            className="w-full"
                            alt="Image"
                        />
                    </div>
                    <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                        <form onSubmit={handleSubmit(onLoginSubmit)}>
                            <div className="mb-6">
                                <input
                                    type="email"  {...register("userEmail")}
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Email address" required />
                            </div>

                            <div className="mb-6">
                                <input
                                    type="password" {...register("userPassword")}
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Password" required />
                            </div>

                            <div className="mb-6">

                                <p onClick={() => router.push("/register")}
                                    className="text-blue-600 cursor-pointer hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                                >{"Don't have account? Please Register"}</p>
                            </div>

                            <button
                                type="submit"
                                className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                            >
                                Sign up
                            </button>

                            <div
                                className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                            >
                                <p className="text-center font-semibold mx-4 mb-0">OR</p>
                            </div>

                        </form>
                        <button onClick={signInWithGoogle}
                            className="bg-red-500 px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3">Continue with google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;