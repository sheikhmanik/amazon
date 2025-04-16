import { configureStore } from "@reduxjs/toolkit";
import toggleModeReducer from "./mode.js"
import categoryReducer from "./category.js";
import languageReducer from "./language.js";
import productFunctionReducer from "./product-function.js";

const store = configureStore({
    reducer: {
        mode: toggleModeReducer,
        category: categoryReducer,
        language: languageReducer,
        productFunction: productFunctionReducer,
    }
})

export default store;