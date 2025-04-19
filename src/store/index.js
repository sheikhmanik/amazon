import { configureStore } from "@reduxjs/toolkit";
import toggleModeReducer from "./theme.js"
import categoryReducer from "./category.js";
import languageReducer from "./language.js";
import productReducer from "./product.js";
import cartReducer from "./cart.js";
import accountReducer from "./account.js";

const store = configureStore({
    reducer: {
        mode: toggleModeReducer,
        category: categoryReducer,
        language: languageReducer,
        product: productReducer,
        cart: cartReducer,
        account: accountReducer,
    }
})

export default store;