import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Checkout from '../components/Home/Checkout/Checkout'
import NavigationBar from '../components/Home/NavigationBar/NavigationBar'
import useFirebase from '../components/Login/Firebase/useFirebase'

export default function IndexCheckout() {
    const { user } = useFirebase();
    // const router = useRouter()
    // useEffect(() => {
    //     if (!user.email) {
    //         router.push({
    //             pathname: '/login',
    //             query: { from: router.pathname }
    //         })
    //     }
    // }, [user.email, router])

    return (
        <div>
            <NavigationBar />
            <Checkout />
        </div>
    )
}
