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
            state.user = action.payload.token.user; // Store user data
            state.isLogin = true;
            state.refresh = action.payload.token.refresh;
            state.access = action.payload.token.access;
        },
        loginFailure: (state) => {
            state.isLoading = false;
            state.isError = true;
        },
        logout: (state) => {
            return initialState; // Reset to initial state
        },
        updateUser: (state, action) => {
            // Update user information in the state
            if (state.user) {
                state.user = { ...state.user, ...action.payload }; // Merge existing user data with updated data
            }
        },
    },
});

// Export actions
export const { loginStart, loginSuccess, loginFailure, logout, updateUser } = authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectIsError = (state) => state.auth.isError;

// Async action for logging in (currently empty)
export const loginUser = (data) => async (dispatch) => {
    // Your login logic will go here
};

export default authSlice.reducer;