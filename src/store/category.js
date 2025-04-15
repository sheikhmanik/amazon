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
        selected: options[0]
    },
    reducers: {
        setSelected(state, action) {
            state.selected = action.payload
        }
    }
})

export const categoryActions = categorySlice.actions;
export default categorySlice.reducer;