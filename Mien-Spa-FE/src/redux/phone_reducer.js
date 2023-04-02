import { createSlice, isAnyOf } from "@reduxjs/toolkit";


const initialState = {
  phone:'',
  isLoading: false,
  error: "",
  success: false,
};

export const phoneSlice = createSlice({
  name: "phone",
  initialState,
  //don't use api
  reducers: {
    addPhone: (state, action) => {
        state.phone= action.payload;
    },

    clearPhone: (state, action) => {
        state.phone='';
    },
  
  },
  //use pai
  extraReducers: (builder) => {
    builder.addDefaultCase((state, action) => {});
  },
});
export const {  addPhone,clearPhone } =
  phoneSlice.actions;

export default phoneSlice.reducer;