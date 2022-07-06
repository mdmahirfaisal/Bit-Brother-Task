import axios from 'axios';
import { useRouter } from 'next/router';
import NavigationBar from '../components/Home/NavigationBar/NavigationBar';
import React, { useEffect, useState } from 'react'
import Footer from '../components/Home/Footer/Footer';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

export default function ProductInfo() {
    const [resultData, setProductData] = useState({});
    const { user } = useSelector(state => state.auth);
    const router = useRouter();
    const pId = router?.query?.productInfo

    useEffect(() => {
        async function loadSingleData() {
            const res = await axios.get(`/api/singleProduct?id=${pId}`)
                .catch(err => console.log(err))
            setProductData(res?.data)
        }
        loadSingleData()
    }, [pId, router])


    const [quantity, setQuantity] = useState(1)

    const handleIncrement = () => {
        if (quantity <= 9) setQuantity(quantity + 1)
    }
    const handleDecrement = () => {
        if (quantity > 1) setQuantity(quantity - 1)
    }

    const handleAddToCart = () => {

        const cartData = { product: resultData?.product, price: resultData?.price, totalPrice: parseFloat(resultData?.price * quantity), quantity, email: user.email, img: resultData?.img, desc: resultData?.desc }

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
                        <img src={resultData?.img} className="w-full" alt="product" />
                    </div>

                    <div className="col-span-12 md:col-span-7 md:border-l p-2">
                        <div className="">
                            <h2 className='text-3xl md:text-4xl font-medium'>{resultData?.product}</h2>
                            <p className='text-lg font-medium'>{resultData?.desc?.slice(0, 100)}</p>
                            <h1 className='my-5 text-3xl md:text-4xl font-semibold '>$ {parseFloat(resultData?.price * quantity)}</h1>
                        </div>

                        <div className="flex items-center justify-between w-[40%] border">
                            <button onClick={handleDecrement} className='text-4xl font-bold bg-gray-200 px-3 pb-2 hover:bg-gray-300'> - </button>
                            <p className='text-2xl font-semibold'> {quantity} </p>
                            <button onClick={handleIncrement} className='text-4xl font-bold bg-gray-200 px-3 pb-2 hover:bg-gray-300'> + </button>
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
}
