import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    clickedProductId: null,
    clickedProductCategory: null
}

const productSlice = createSlice({
    name: 'function',
    initialState,
    reducers: {
        openItem(state, action) {
            const { category, id } = action.payload;
            state.clickedProductId = id;
            state.clickedProductCategory = category;
        }
    }
    
})

export const productActions = productSlice.actions;
export default productSlice.reducer;