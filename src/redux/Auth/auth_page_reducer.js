import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {login } from "./auth_page_thunk";


const initialState = {
    auth: null,
    isLoading: false,
    error: false,
    alertSuccess: false,
};

export const AuthPage = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state, action) => {
            state.user = null;
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
        },
        turnOffRegisterSuccess: (state, action) => {
            state.alertSuccess = false;
        },
        turnOffError: (state, action) => {
            state.error = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.error = true;
            state.auth  = state.payload;
        });

        builder.addMatcher(
            isAnyOf(login.fulfilled),
            (state, action) => {
                state.isLoading = false;
                state.auth = action.payload;
                state.error = false;
            }
        );
        builder.addMatcher(
            isAnyOf(
                login.pending,
            ),(state ) => {
                state.isLoading = true;
            }
        );

    },
});

export const { logout, turnOffRegisterSuccess, turnOffError} =
AuthPage.actions;

export default AuthPage.reducer;
