import { configureStore } from '@reduxjs/toolkit';
import AuthSliceReducer from '../redux/Slices/AuthSlice';

export const store = configureStore({
    reducer: {
        auth: AuthSliceReducer,
    },
})