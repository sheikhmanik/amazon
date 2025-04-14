import { configureStore } from "@reduxjs/toolkit";
import ToggleModeReducer from "./mode.js"
import categoryReducer from "./category.js";
import languageReducer from "./language.js";

const store = configureStore({
    reducer: { toggleMode: ToggleModeReducer, category: categoryReducer, languages: languageReducer }
})

export default store;