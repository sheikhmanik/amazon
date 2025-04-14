import { configureStore } from "@reduxjs/toolkit";
import ToggleModeReducer from "./mode.js"
import categoryReducer from "./category.js";

const store = configureStore({
    reducer: { toggleMode: ToggleModeReducer, category: categoryReducer }
})

export default store;