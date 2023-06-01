import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { combineReducers } from "redux";
import { persistStore } from "redux-persist";
import BookingPage  from './Booking/booking_page_reducer';
import AuthPage  from './Auth/auth_page_reducer';
import CategoriesPage  from './Category/category_page_reducer';
import UserPage  from './User/user_page_reducer';
import ProductPage  from './Product/product_page_reducer';
import CartPage  from './Cart/cart_page_reducer';
import StoragePage from './Storage/storage_page_reducer';
import OrderProPage from './OrderPro/order_page_reducer';
import ServicesPage  from './Service/service_page_reducer';
const rootReducer = combineReducers({
    BookingPage,
    AuthPage,
    CategoriesPage,
    UserPage,
    ProductPage,
    CartPage,
    StoragePage,
    OrderProPage,
    ServicesPage,
});


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ["CartPage"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store);