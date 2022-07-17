import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import useFirebase from '../../Login/Firebase/useFirebase';

const Checkout = () => {
    const router = useRouter();
    const { user } = useFirebase();
    const { totalCartPrice, totalCartQuantity } = useSelector(state => state.products);
    const { register, handleSubmit, reset } = useForm();
    const [deliveryInfo, setDeliveryInfo] = useState({});

    const handleDeliveryInfo = (data) => {
        data.email = user.email
        console.log(data);
        setDeliveryInfo(data);
        reset()
    };

    const handleProceedPayment = () => {
        if (deliveryInfo.fullName) {
            Swal.fire(
                'Success',
                'Order completed success',
                'success'
            )
        }
        else {
            Swal.fire(
                'Failed',
                'Please fil all information and save it',
                'warning'
            )
        }
    }

    return (
        <div className="bg-[#f4f4f4] min-h-[100vh]">
            <div className="max-w-[1280px] mx-auto">
                <div className='w-[98%] mx-auto'>
                    <h1 className='text-center text-gray-700 font-bold text-3xl lg:text-4xl py-5'>Checkout page</h1>

                    {totalCartPrice ?
                        <div className="grid grid-cols-12 gap-5">
                            <form onSubmit={handleSubmit(handleDeliveryInfo)} className='col-span-12 md:col-span-8'>
                                <div className="relative shadow-md grid grid-cols-2 gap-5 rounded-xl p-3 bg-white mb-5">
                                    <h2 className='col-span-2 text-lg'>Delivery Information</h2>
                                    <div>
                                        <p className="text-sm text-gray-500">Full Name</p>
                                        <input className="border py-1 px-2 text-gray-500 w-full mb-4 focus:outline-none" {...register("fullName")} type="text" placeholder='Enter you r first and last name' required />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Country</p>
                                        <input className="border py-1 px-2 text-gray-500 w-full mb-4 focus:outline-none" {...register("country")} type="text" placeholder='Enter your country' required />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <input className="border py-1 px-2 text-gray-500 w-full mb-4 focus:outline-none" defaultValue={user?.email} disabled type="email" placeholder='Enter your email' required />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">City</p>
                                        <input className="border py-1 px-2 text-gray-500 w-full mb-4 focus:outline-none" {...register("city")} type="text" placeholder='Enter your city' required />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Phone</p>
                                        <input className="border py-1 px-2 text-gray-500 w-full mb-4 focus:outline-none" {...register("phone")} type="number" placeholder='Enter your phone' required />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Address</p>
                                        <input className="border py-1 px-2 text-gray-500 w-full mb-4 focus:outline-none" {...register("address")} type="text" placeholder='Enter your address' required />
                                    </div>
                                    <div className="col-span-2 ">
                                        <input className='text-white grid-none bg-green-600 block w-48 mr-10 ml-auto py-2 ms-auto hover:bg-green-500 cursor-pointer' type="submit" value="Save" />
                                    </div>
                                </div>

                            </form>

                            {/* -------- Checkout -------- */}
                            <div className="col-span-12 md:col-span-4">
                                <div className="bg-white rounded-lg">
                                    <h2 className='text-2xl mb-3'>Order Summary</h2>
                                    <div className='flex items-center justify-between px-2 mb-3'>
                                        <h5 className='text-lg text-gray-500'>Subtotal ({totalCartQuantity} items)</h5>
                                        <h5 className='text-lg text-gray-600'>$ {totalCartPrice}</h5>
                                    </div>

                                    <div className='flex items-center justify-between px-2 mb-3 border-b'>
                                        <h5 className='text-lg text-gray-500'>Shipping Fee</h5>
                                        <h5 className='text-lg text-gray-600'>$ 00</h5>
                                    </div>

                                    <div className='flex items-center justify-between px-2 mb-3 '>
                                        <h5 className='text-lg'>Total</h5>
                                        <h5 className='text-lg text-red-500 font-medium'>$ {totalCartPrice}</h5>
                                    </div>
                                    <button onClick={handleProceedPayment} className='text-lg mx-auto block w-[96%] rounded-md text-white bg-red-200 transition-all duration-600 hover:bg-[#f57224] text-white font-semibold py-2'>Proceed to payment</button>

                                </div>
                            </div>
                        </div>
                        :
                        <>
                            <h1 className='text-center text-4xl text-gray-400 mt-[10vw] font-bold'>No Details available in a cart please back to cart page and check</h1>
                            <button onClick={() => {
                                if (user.email) router.push("/cart")
                                else { router.push("/") }
                            }} className='block mt-5 mx-auto bg-red-400 hover:bg-red-500 text-gray-200 text-lg rounded-xl py-2 px-5'>Go back</button>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Checkout;