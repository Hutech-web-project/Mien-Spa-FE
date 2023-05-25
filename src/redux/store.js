import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { combineReducers } from "redux";
import { persistStore } from "redux-persist";
import BookingPage  from './Booking/booking_page_reducer';
import UserPage  from './Auth/auth_page_reducer';
import CategoriesPage  from './Category/category_page_reducer';
const rootReducer = combineReducers({
    BookingPage,
    UserPage,
    CategoriesPage,
});


const persistConfig = {
  key: 'root',
  storage,
  whitelist: [""],

};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer:persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store);