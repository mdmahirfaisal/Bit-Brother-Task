import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Checkout from '../components/Home/Checkout/Checkout'
import NavigationBar from '../components/Home/NavigationBar/NavigationBar'

export default function IndexCheckout() {
    const { user } = useSelector(state => state.auth)
    const router = useRouter()
    useEffect(() => {
        if (!user.email) {
            router.push({
                pathname: '/login',
                query: { from: router.pathname }
            })
        }
    }, [user.email, router])

    return (
        <div>
            <NavigationBar />
            <Checkout />
        </div>
    )
}
