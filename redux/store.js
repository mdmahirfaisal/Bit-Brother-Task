import { configureStore } from '@reduxjs/toolkit';
import AuthSliceReducer from '../redux/Slices/AuthSlice';
import ProductsSliceReducer from '../redux/Slices/ProductsSlice';

export const store = configureStore({
    reducer: {
        auth: AuthSliceReducer,
        products: ProductsSliceReducer,
    },
})