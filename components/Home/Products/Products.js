import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const Products = () => {
    const router = useRouter();
    const { allProducts, loading } = useSelector(state => state.products)

    return (
        <div className='w-[98%] mx-auto'>
            <h1 className='text-center text-gray-700 font-bold text-3xl lg:text-4xl my-5'>Our Products</h1>

            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                {allProducts?.map(data => <div key={data?._id}
                    className="shadow-md rounded-xl p-3">
                    <img className="rounded-xl" src={data?.img} alt="products" />
                    <div className="mt-3 flex items-center justify-around">
                        <h2 className='text-2xl md:text-3xl text-center font-semibold'>{data?.product}</h2>
                        <h2 className='text-2xl md:text-3xl text-center font-semibold'>$ {data?.price}</h2>
                    </div>
                    <p className='mt-3 lg:text-lg'>{data?.desc}</p>
                    <button onClick={() => router.push(data?._id)} className='bg-sky-500 hover:bg-sky-600 py-1 w-full text-white mt-2'>Se details</button>
                </div>)}
            </div>
        </div>
    );
};

export default Products;
