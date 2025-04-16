import { createSlice } from "@reduxjs/toolkit";

const initialFunctionState = {
    clickedProductId: null,
    clickedProductCategory: null
}

const productFunctionSlice = createSlice({
    name: 'function',
    initialState: initialFunctionState,
    reducers: {
        openItem(state, action) {
            const { category, id } = action.payload;
            state.clickedProductId = id;
            state.clickedProductCategory = category;
        }
    }
    
})

export const productFunctionActions = productFunctionSlice.actions;
export default productFunctionSlice.reducer;