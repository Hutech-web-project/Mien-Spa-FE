import { createSlice, isAnyOf } from "@reduxjs/toolkit";


const initialState = {
    date: "",
    time: "",
    id_time_active: 0,
    phone: "",
    isLoading: false,
    error: "",
    success: false,
};

export const booking_page = createSlice({
    name: "booking_page",
    initialState,
    //don't use api
    reducers: {
        addPhone: (state, action) => {           
            state.phone = action.payload;
        },

        addDate: (state, action) => {
            state.date = action.payload;
        },

        addTime: (state, action) => {
            state.time = action.payload;
        },

        addIdTimeActiver: (state, action) => {
            state.id_time_active = action.payload;
        },

        clearIdTimeActiver: (state, action) => {
            state.id_time_active = '';
        },

        clearPhone: (state, action) => {
            state.phone = '';
        },

    },
    //use pai
    extraReducers: (builder) => {
        builder.addDefaultCase((state, action) => { });
    },
});
export const { addPhone, clearPhone, addDate, addTime, addIdTimeActiver, clearIdTimeActiver } =
booking_page.actions;

export default booking_page.reducer;
