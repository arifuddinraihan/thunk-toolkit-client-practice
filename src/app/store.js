import { configureStore } from "@reduxjs/toolkit"
import cartSlice from "./features/cart/cartSlice";
import filterSlice from "./features/filters/filterSlice";

const store = configureStore({
    reducer: {
        cart : cartSlice,
        filter : filterSlice,
    }
});

export default store;