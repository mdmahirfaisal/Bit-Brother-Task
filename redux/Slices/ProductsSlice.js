import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductsData = createAsyncThunk(
    "products/fetchProductsData", async () => {
        const res = await fetch(`/api/products`)
            .then(res => res.json())
        return res;
    })
export const fetchSingleProduct = createAsyncThunk(
    "product/fetchSingleProduct", async (productId) => {
        console.log(productId);
        const res = await fetch(`/api/singleProduct?id=${productId}`)
            .then(res => res.json())
        return res;
    })


const initialState = {
    loading: false,
    allProducts: [],
    singleProduct: null,
    error: null,
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

    /// Extra Reducers ///
    extraReducers: {
        [fetchProductsData.pending]: (state) => {
            state.loading = true
        },
        [fetchProductsData.fulfilled]: (state, action) => {
            state.loading = false
            state.allProducts = action.payload
        },
        [fetchProductsData.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        // single product
        [fetchSingleProduct.pending]: (state) => {
            state.loading = true
        },
        [fetchSingleProduct.fulfilled]: (state, action) => {
            state.loading = false
            state.singleProduct = action.payload
        },
        [fetchSingleProduct.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    },

});

// Action creators are generated for each case reducer function
export const { handleTotalCartPrice, handleTotalCartQuantity } = ProductsSlice.actions

export default ProductsSlice.reducer