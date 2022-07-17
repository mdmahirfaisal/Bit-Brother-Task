import axios from 'axios';
import { useRouter } from 'next/router';
import NavigationBar from '../components/Home/NavigationBar/NavigationBar';
import React, { useState } from 'react'
import Footer from '../components/Home/Footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleProduct } from '../redux/Slices/ProductsSlice';
import Swal from 'sweetalert2';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';
import { useEffect } from 'react';
import useFirebase from '../components/Login/Firebase/useFirebase';


export default function ProductInfo() {
    const router = useRouter();
    const pId = router?.query?.productInfo;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSingleProduct(pId))
    }, [dispatch, pId])

    const { user } = useFirebase();
    const { singleProduct, loading } = useSelector(state => state.products)
    const [quantity, setQuantity] = useState(1)

    // const resultData = productsData?.find((data) => data._id === pId);

    const handleIncrement = () => {
        if (quantity <= 9) setQuantity(quantity + 1)
    }
    const handleDecrement = () => {
        if (quantity > 1) setQuantity(quantity - 1)
    }

    const handleAddToCart = () => {

        const cartData = { product: singleProduct?.product, price: singleProduct?.price, totalPrice: parseFloat(singleProduct?.price * quantity), quantity, email: user.email, img: singleProduct?.img, desc: singleProduct?.desc }

        if (!user?.email) {
            router.push("/login")
        }
        else {
            axios.post('/api/cart', cartData)
                .then(res => {
                    console.log(res);
                    Swal.fire({
                        icon: 'success',
                        title: 'This product added to cart',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <>
            <NavigationBar />
            <div className='max-w-[1280px] mx-auto'>
                <div className="w-[98%] md:w-[90%] min-h-[50vh] lg:w-[80%] mx-auto grid grid-cols-12 gap-3 mt-[5vw] border">

                    <div className="col-span-12 md:col-span-5">
                        <img src={singleProduct?.img} className="w-full" alt="product" />
                    </div>

                    <div className="col-span-12 md:col-span-7 md:border-l p-2">
                        <div className="">
                            <h2 className='text-3xl md:text-4xl font-medium'>{singleProduct?.product}</h2>
                            <p className='text-lg font-medium'>{singleProduct?.desc?.slice(0, 100)}</p>
                            <h1 className='my-5 text-3xl md:text-4xl font-semibold '>$ {parseFloat(singleProduct?.price * quantity)}</h1>
                        </div>

                        <div className="flex items-center justify-between w-[40%] border">
                            <button onClick={handleDecrement} className='text-xl  font-bold bg-gray-100 px-3 py-[16px] text-gray-500 hover:bg-gray-300'><FaMinus /></button>
                            <p className='text-2xl font-semibold'> {quantity} </p>
                            <button onClick={handleIncrement} className='text-xl  font-bold bg-gray-100 px-3 py-[16px] text-gray-500 hover:bg-gray-300'><FaPlus /></button>
                        </div>
                        <div className='grid grid-cols-2 gap-4 mt-5'>
                            <button className='text-lg text-white bg-[#2abbe8] text-white font-semibold py-2'>Buy Now</button>
                            <button onClick={handleAddToCart} className='text-lg text-white bg-[#f57224] text-white font-semibold py-2'>Add To Cart</button>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
};

// export const getStaticProps = async () => {
//     const res = await axios.get(`http://localhost:3000/api/products`);
//     return {
//         props: {
//             productsData: res.data,
//         },
//         revalidate: 10,
//     };
// };

// export async function getStaticPaths() {
//     return {
//         paths: [], //indicates that no page needs be created at build time
//         fallback: "blocking", //indicates the type of fallback
//     };
// }