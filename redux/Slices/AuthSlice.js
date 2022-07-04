import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    authLoading: false,
    user: {},

}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // login with googl
        handleSignedInUser: (state, { payload }) => {
            state.user = payload;
        },
        // login with googl
        handleLoading: (state, { payload }) => {
            state.authLoading = payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { handleSignedInUser, handleLoading } = AuthSlice.actions

export default AuthSlice.reducer