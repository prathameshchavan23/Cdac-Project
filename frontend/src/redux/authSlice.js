import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: null, // { email, role }
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // loginStart , loginSuccess, loginFailure, logout, loadUserFromStorage these all are actions
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.loading = false;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        loginFailure: (state, action) => {
            state.isAuthenticated = false;
            state.user = null;
            state.loading = false;
            state.error = action.payload;
            localStorage.removeItem('user');
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('user');
        },
        loadUserFromStorage: (state) => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (user) {
                    state.user = user;
                    state.isAuthenticated = true;
                }
            } catch (error) {
                console.error("Failed to parse user from localStorage", error);
                state.isAuthenticated = false;
                state.user = null;
            }
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
