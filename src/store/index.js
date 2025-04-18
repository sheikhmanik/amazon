import { configureStore } from "@reduxjs/toolkit";
import toggleModeReducer from "./theme.js"
import categoryReducer from "./category.js";
import languageReducer from "./language.js";
import productReducer from "./product.js";
import cartReducer from "./cart.js";

const store = configureStore({
    reducer: {
        mode: toggleModeReducer,
        category: categoryReducer,
        language: languageReducer,
        product: productReducer,
        cart: cartReducer,
    }
})

export default store;