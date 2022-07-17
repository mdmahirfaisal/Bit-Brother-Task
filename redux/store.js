import { configureStore } from '@reduxjs/toolkit';
import ProductsSliceReducer from '../redux/Slices/ProductsSlice';

export const store = configureStore({
    reducer: {
        products: ProductsSliceReducer,
    },
})