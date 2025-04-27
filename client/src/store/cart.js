import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartProducts:  localStorage.getItem('cartProducts')
        ? JSON.parse(localStorage.getItem('cartProducts')) 
        : []
}

const cartSlice = createSlice({
    name: "cart-function",
    initialState,
    reducers: {
        addToCart(state, action) {
            const { id, product } = action.payload;
            const existingProductIndex = state.cartProducts.findIndex(p => p.id === id);
            if (existingProductIndex !== -1) {
                state.cartProducts[existingProductIndex].quantity += 1;
            } else {
                state.cartProducts.push({ ...product, quantity: 1 });
            }
            localStorage.setItem('cartProducts', JSON.stringify(state.cartProducts));
        },
        updateQuantity(state, action) {
            const { id, amount } = action.payload;
            const product = state.cartProducts.find(product => product.id === id);
            const productIndex = state.cartProducts.findIndex(product => product.id === id);
            if (product.quantity === 1 && amount === -1) {
                state.cartProducts.splice(productIndex, 1)
            } else {
                state.cartProducts[productIndex].quantity += amount;
            }
            localStorage.setItem('cartProducts', JSON.stringify(state.cartProducts));
        },
        removeCartItem(state) {
            state.cartProducts = [];
            localStorage.removeItem('cartProducts');
        }
    }
})

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;