import { createSlice } from "@reduxjs/toolkit";

const options = [
    "All",
    "Beauty",
    "Fragrances",
    "Furniture",
    "Groceries"
];

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        options,
        selectedCategory: options[0]
    },
    reducers: {
        setSelected(state, action) {
            state.selectedCategory = action.payload
        }
    }
})

export const categoryActions = categorySlice.actions;
export default categorySlice.reducer;