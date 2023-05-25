import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchUserById, login } from "./auth_page_thunk";


const initialState = {
    user: null,
    listUser: [],
    listRole: [],
    isLoading: false,
    error: false,
    alertSuccess: false,
};

export const UserPage = createSlice({
    name: "user",
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
        });
        builder.addMatcher(
            isAnyOf(login.fulfilled, fetchUserById.fulfilled),
            (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.error = false;
            }
        );
        builder.addMatcher(
            isAnyOf(
              login.pending,
            //   register.pending,
              fetchUserById.pending,
            //   fetchAllUser.pending,
            //   updateUser.pending,
            //   updatePassword.pending,
            //   fetchUserByIdAdmin.pending,
            //   fetchAllRole.pending,
            //   postRole.pending,
            //   changePassword.pending
            ),
            (state, action) => {
              state.isLoading = true;
            }
          );
    }
});

export const { logout, turnOffRegisterSuccess, turnOffError } =
    UserPage.actions;

export default UserPage.reducer;
