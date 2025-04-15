import { configureStore } from "@reduxjs/toolkit";
import toggleModeReducer from "./mode.js"
import categoryReducer from "./category.js";
import languageReducer from "./language.js";

const store = configureStore({
    reducer: {
        mode: toggleModeReducer,
        category: categoryReducer,
        language: languageReducer
    }
})

export default store;