import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import useFirebase from '../../Login/Firebase/useFirebase';

// class name 
const navLinkClassName = "cursor-pointer block py-2 pr-4 pl-3 text-gray-700  md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:text-white  dark:border-gray-700 ml-5 mt-2";

const NavigationBar = () => {
    const router = useRouter();
    // const { user } = useSelector(state => state.auth);
    const { totalCartQuantity } = useSelector(state => state.products);
    const { logOut, user } = useFirebase();

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't log out",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                Swal.fire(
                    'Logged out',
                    'Log out success',
                    'success'
                )
            }
        })
    }

    return (
        <div>
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
                <div className="container mx-auto grid grid-cols-12">
                    <div className='col-span-12 md:col-span-7'>
                        <div className="flex items-center md:font-medium">
                            <h2 onClick={() => router.push("/")} className="self-center text-xl lg:text-2xl cursor-pointer font-semibold whitespace-nowrap dark:text-white">Bit Brothers</h2>
                            <Link href="/" ><a className={navLinkClassName}>Home</a></Link>
                            <Link href="/cart" ><a className={navLinkClassName}>Cart </a></Link>

                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 col-span-10 md:col-span-5 mx-auto">

                        {user?.email ? <>
                            <div>
                                <img className="mx-auto w-6 h-6 rounded-full" src={user.photoURL ? user.photoURL : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"} alt="" />
                                <p className="text-gray-400 font-semibold text-center text-sm">{user.displayName}</p>
                            </div>
                            <p onClick={handleLogout} className="bg-red-500 px-2 py-1 rounded hover:bg-red-600 cursor-pointer">Logout</p>
                        </> : <p onClick={() => router.push("/login")} className="bg-red-500 px-2 py-1 rounded hover:bg-red-600 cursor-pointer">Login</p>}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavigationBar;