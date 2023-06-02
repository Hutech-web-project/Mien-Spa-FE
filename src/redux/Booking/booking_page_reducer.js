import { createSlice, } from "@reduxjs/toolkit";


const initialState = {
    phone: "",
    date: "",
    time: "",
    services:[],
    checkPhone: false,
    idTimeActive: "",
    isLoading: false,
    error: "",
    success: false,
};

export const BookingPage = createSlice({
    name: "booking_page",
    initialState,
    //don't use api
    reducers: {
        addPhone: (state, action) => {
            state.phone = action.payload;
        },

        clearPhone: (state, action) => {
            state.phone = "";
        },
        addService:(state,action) =>{   
            state.services?.push(action.payload)       
       },
        removeService:(state,action) =>{
            state.services = [...state.services.filter((item) => item.seId  !== action.payload.seId )]
        },

        addDate: (state, action) => {
            state.date = action.payload;
        },

        clearDate: (state, action) => {
            state.date = "";
        },

        addTime: (state, action) => {
            state.time = action.payload;
        },

        clearTime: (state, action) => {
            state.time = "";
        },

        addIdTimeActive: (state, action) => {
            state.idTimeActive = action.payload;
        },

        clearIdTimeActive: (state, action) => {
            state.idTimeActive = "";
        },
        successPhone:(state)=>{
            state.checkPhone = true;
        },
        errorPhone:(state)=>{
            state.checkPhone = false;
        }

    },
    //use pai
    extraReducers: (builder) => {
        builder.addDefaultCase((state, action) => { });
    },
});
export const {
    addPhone,
    clearPhone,
    addService,
    removeService,
    addDate,
    clearDate, 
    addTime, 
    clearTime, 
    addIdTimeActive, 
    clearIdTimeActive,
    successPhone,
    errorPhone,
} = BookingPage.actions;

export default BookingPage.reducer;