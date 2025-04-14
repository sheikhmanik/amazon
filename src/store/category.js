import { createSlice } from "@reduxjs/toolkit";

const options = [
    "All",
    "Cloth",
    "Electronics",
    "Furniture",
    "Jwellary",
    "Industrial"
]

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