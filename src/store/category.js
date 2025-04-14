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
    initialState: {options},
    reducers: {}
})

export default categorySlice.reducer;