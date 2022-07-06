import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Cart from '../components/Home/Cart/Cart'
import NavigationBar from '../components/Home/NavigationBar/NavigationBar'

export default function IndexCart() {
    // const { user, authLoading } = useSelector(state => state.auth)
    // const router = useRouter()
    // useEffect(() => {
    //     if (!user.email) {
    //         router.push({
    //             pathname: '/login',
    //             query: { from: router.pathname }
    //         })
    //     }
    // }, [authLoading, user.email, router])
    return (
        <>
            <NavigationBar />
            <Cart />
        </>
    )
}


