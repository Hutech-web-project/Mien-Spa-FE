import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { blockServices, getServices, postServices, putServices } from "./service_page_thunk"


const initialState = {
    services: [],
    isLoading: false,
    error: ""
}

const ServicesPage = createSlice({
    name: 'services',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getServices.fulfilled, (state, action) => {
            state.isLoading = false;
            state.services = action.payload
        })
        builder.addMatcher(isAnyOf(postServices.fulfilled, putServices.fulfilled,blockServices.fulfilled), (state,) => {
            state.isLoading = false;
        })
        builder.addMatcher(isAnyOf(getServices.pending, postServices.pending, putServices.pending,blockServices.pending), (state,) => {
            state.isLoading = true;
        })
        builder.addMatcher(isAnyOf(getServices.rejected, postServices.rejected,blockServices.rejected, putServices.rejected), (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        })
    }
})

export default ServicesPage.reducer;