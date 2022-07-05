import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    totalCartPrice: 0,
    totalCartQuantity: 0,

}

export const ProductsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // login with googl
        handleTotalCartPrice: (state, { payload }) => {
            state.totalCartPrice = payload;
        },
        // login with googl
        handleTotalCartQuantity: (state, { payload }) => {
            state.totalCartQuantity = payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { handleTotalCartPrice, handleTotalCartQuantity } = ProductsSlice.actions

export default ProductsSlice.reducer