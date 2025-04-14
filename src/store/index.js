import { configureStore } from "@reduxjs/toolkit";
import ToggleModeReducer from "./mode.js"
import categoryReducer from "./category.js";
import languageReducer from "./language.js";

const store = configureStore({
    reducer: {
        mode: ToggleModeReducer,
        category: categoryReducer,
        language: languageReducer
    }
})

export default store;