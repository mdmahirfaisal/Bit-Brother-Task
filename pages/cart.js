import axios from 'axios';
import React from 'react'
import Cart from '../components/Home/Cart/Cart'
import NavigationBar from '../components/Home/NavigationBar/NavigationBar'

export default function cart({ cartData }) {
    return (
        <>
            <NavigationBar />
            <Cart cartData={cartData} />
        </>
    )
}

// export const getStaticProps = async () => {
//     const res = await axios.get(`/api/cart`);
//     return {
//         props: {
//             cartData: res.data,
//         },
//         revalidate: 10
//     };
// };
