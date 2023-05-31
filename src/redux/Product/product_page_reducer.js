import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { postProducts, deleteProducts, getProducts, putProducts  } from "./product_page_thunk.js"


const initialState = {
    products: [],
    isLoading: false,
    error: ""
}

const ProductPage = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload
        })
        builder.addMatcher(isAnyOf(postProducts.fulfilled, putProducts.fulfilled), (state,) => {
            state.isLoading = false;
        })
        builder.addMatcher(isAnyOf(getProducts.pending, postProducts.pending, putProducts.pending,deleteProducts.pending), (state,) => {
            state.isLoading = true;
        })
        builder.addMatcher(isAnyOf(getProducts.rejected, postProducts.rejected, putProducts.rejected,deleteProducts.rejected), (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        })
    }
})

export default ProductPage.reducer;