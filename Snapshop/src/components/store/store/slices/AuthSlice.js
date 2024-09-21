
// src/slices/authSlice.js

import { createSlice } from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';


const initialState = {
    user: null,
    isLoading: false,
    isError: false,
    isLogin: false,
    access: false,
    refresh: false,


};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.user = action.payload.token.user;
            state.isLogin = true
            state.refresh = action.payload.token.refresh
            state.access = action.payload.token.access
        },
        loginFailure: (state) => {
            state.isLoading = false;
            state.isError = true;
        },
        logout: (state) => {
            state = initialState;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectIsError = (state) => state.auth.isError;

export const loginUser = (data) => async (dispatch) => {

};

export default authSlice.reducer;
