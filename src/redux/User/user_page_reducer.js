import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { changePassword, getAllUser, getUserById, getUserByIdAdmin, postUser, putUser, updatePassword } from "./user_page_thunk";


const initialState = {
    user: null,
    listUser:[],
    isLoading: false,
    error: false,
    alertSuccess: false,
};

export const UserPage = createSlice({
    name: "user",
    initialState,
    reducers: {
      AddAdress: (state, action) => {
        state.usAddress = action.payload;
      },
    },
    extraReducers: (builder) => {
          builder.addCase(getAllUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listUser = action.payload;
            state.error = false;
          });
          builder.addMatcher(
            isAnyOf(
              getUserById.rejected,
              getAllUser.rejected,
              getUserByIdAdmin.rejected,
              postUser.rejected,
              putUser.rejected,
            //   fetchAllRole.rejected,
            //   postRole.rejected,
              changePassword.rejected
            ),
            (state, action) => {
              state.isLoading = false;
            }
          );
          builder.addMatcher(
            isAnyOf(getUserById.fulfilled),
            (state, action) => {
              state.isLoading = false;
              state.user = action.payload;
              state.error = false;
            }
          );
          builder.addMatcher(
            isAnyOf(
                getUserByIdAdmin.fulfilled,
                postUser.fulfilled,
                updatePassword.fulfilled,
                changePassword.fulfilled,
                putUser.fulfilled,
            ),
            (state,) => {
              state.isLoading = false;
              state.error = false;
            }
          );
          builder.addMatcher(
            isAnyOf(
              getUserById.pending,
              getAllUser.pending,
              postUser.pending,
              updatePassword.pending,
              getUserByIdAdmin.pending,
              changePassword.pending,
              putUser.pending,
            ),
            (state, action) => {
              state.isLoading = true;
            }
          );   
        },
});
export const {
  AddAdress
} = UserPage.actions;
export default UserPage.reducer;
