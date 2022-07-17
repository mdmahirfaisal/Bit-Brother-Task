import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleTotalCartPrice, handleTotalCartQuantity } from '../../../redux/Slices/ProductsSlice';
import { IoMdClose } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useFirebase from '../../Login/Firebase/useFirebase';


const Cart = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { user } = useFirebase();
    console.log(user);
    const { totalCartPrice, totalCartQuantity } = useSelector(state => state.products);
    const [cartData, setCartData] = useState([]);
    const [isQnUpdated, setIsQnUpdated] = useState(false)

    // load cart data and sum total product price and total items
    useEffect(() => {
        setIsQnUpdated(false);
        if (user.email) {
            async function loadCartData() {
                const res = await axios.get(`/api/cart?email=${user?.email}`)
                    .catch(err => console.log(err));
                setCartData(res?.data)
                // Sum //
                let priceSum = 0
                let quantitySum = 0
                res?.data?.reduce((acc, curr) => {
                    priceSum += curr.totalPrice;
                    quantitySum += curr.quantity;
                    return acc
                }, 0)
                dispatch(handleTotalCartPrice(priceSum));
                dispatch(handleTotalCartQuantity(quantitySum));
            }
            loadCartData()
        }
    }, [dispatch, user.email, isQnUpdated])


    // quantity 
    const handleIncrement = (data) => {
        const quantity = parseFloat(data.quantity)
        const pri = parseFloat(data.price)
        const totalPri = parseFloat(data.totalPrice)
        if (quantity <= 9) {
            data.quantity = quantity + 1;
            data.totalPrice = totalPri + pri;

            const url = `/api/cart?id=${data?._id}`;
            axios.put(url, data)
                .then((res) => {
                    console.log(res.data);
                    if (res.data.modifiedCount) {
                        setIsQnUpdated(true)
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleDecrement = (data) => {
        const quantity = parseFloat(data.quantity)
        const pri = parseFloat(data.price)
        const totalPri = parseFloat(data.totalPrice)

        if (quantity > 1) {
            data.quantity = quantity - 1;
            data.totalPrice = totalPri - pri;
            const url = `/api/cart?id=${data?._id}`;
            axios.put(url, data)
                .then((res) => {
                    console.log(res.data);
                    if (res.data.modifiedCount) {
                        setIsQnUpdated(true)
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    // product remove from cart
    const handRemoveProduct = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't remove",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`/api/cart?id=${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            setCartData(cartData.filter(data => data._id !== id));
                            setIsQnUpdated(true)
                        }
                    })
                    .catch(err => console.log(err))
            }
        })
    };

    // go to checkout 
    const handleGoCheckout = () => {
        if (totalCartPrice) router.push('/checkout')
    }

    return (
        <div className="bg-[#f4f4f4] min-h-[100vh]">
            <div className="max-w-[1280px] mx-auto">
                <div className='w-[98%] mx-auto'>
                    <h1 className='text-center text-gray-700 font-bold text-3xl lg:text-4xl py-5'>Cart Products List</h1>

                    <div className="grid grid-cols-12 gap-5">
                        <div className='col-span-12 md:col-span-8'>
                            {cartData?.length ? cartData?.map(data => <div key={data?._id}
                                className="relative shadow-md flex gap-1 md:gap-2 lg:gap-3 rounded-xl p-3 bg-white mb-5">
                                <img className="rounded-xl w-[200px] h-[150px]" src={data?.img} alt="products" />
                                <div className="mt-3 ">
                                    <h2 className='text-2xl font-semibold'>{data?.product}</h2>
                                    <p className=''>{data?.desc?.slice(0, 60)}</p>
                                </div>
                                <div className='w-[30%]'>
                                    <h1 className='my-2 text-2xl font-semibold'>$ {data?.price} </h1>
                                    <div className="flex items-center justify-between w-full h-[50px] border">
                                        <button onClick={() => handleDecrement(data)} className='text-xl  font-bold bg-gray-100 px-3 py-[16px] text-gray-500 hover:bg-gray-300'><FaMinus /></button>
                                        <p className='text-2xl font-semibold'> {data?.quantity} </p>
                                        <button onClick={() => handleIncrement(data)} className='text-xl  font-bold bg-gray-100 px-3 py-[16px] text-gray-500 hover:bg-gray-300'><FaPlus /> </button>
                                    </div>
                                </div>
                                <button onClick={() => handRemoveProduct(data._id)} className=' float-right mr-[-20px] mt-[-25px] h-8 w-8 rounded-[50%] px-[5px] text-lg bg-red-500 text-white'><IoMdClose className='text-xl' /></button>
                            </div>)
                                :
                                <>
                                    <h1 className='text-center text-4xl text-gray-400 mt-[10vw] font-bold'>No products available in a cart please back to home and add to checkout</h1>
                                    <button onClick={() => router.push("/")} className='block mt-5 mx-auto bg-red-400 hover:bg-red-500 text-gray-200 text-lg rounded-xl py-2 px-5'>Back to home</button>
                                </>
                            }
                        </div>

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
                                <button onClick={handleGoCheckout} className='text-lg mx-auto block w-[96%] rounded-md text-white bg-red-200 transition-all duration-600 hover:bg-[#f57224] text-white font-semibold py-2'>Proceed to checkout</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;