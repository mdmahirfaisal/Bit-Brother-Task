import React from 'react';

const Cart = ({ cartData }) => {

    const handRemoveProduct = () => {
        fetch(deleteURL, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {

                }
            })
    }

    return (
        <div className='w-[98%] mx-auto'>
            <h1 className='text-center text-gray-700 font-bold text-3xl lg:text-4xl my-5'>Our Products</h1>

            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                {cartData?.map(data => <div key={data._id}
                    className="shadow-md flex items-center gap-2 rounded-xl p-3">
                    <img className="rounded-xl w-[150px] h-[100px]" src={data.img} alt="products" />
                    <div className="mt-3 flex flex-col">
                        <h2 className='text-lg font-semibold'>{data.product}</h2>
                        <p className='lg:text-sm'>{data.desc.slice(0, 60)}</p>
                    </div>
                </div>)}
            </div>
        </div>
    );
};

export default Cart;