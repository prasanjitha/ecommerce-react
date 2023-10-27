import { configureStore } from "@reduxjs/toolkit";

import productSlice from "./product-slice";
import authSlice from "./auth-slice";
import cartSlice from "./cart-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
    reducer: { products: productSlice.reducer, authentication: authSlice.reducer, cart: cartSlice.reducer, ui: uiSlice.reducer, }
});

export default store;