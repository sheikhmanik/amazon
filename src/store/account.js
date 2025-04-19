import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accountInfo: localStorage.getItem('AccountInfo')
    ? JSON.parse(localStorage.getItem('AccountInfo'))
    : null
}

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        signUp(state, action) {
            state.accountInfo = action.payload;
            localStorage.setItem('AccountInfo', JSON.stringify(state.accountInfo));
        },
        logIn(state) {
            state.accountInfo.loggedIn = true;
            localStorage.setItem('AccountInfo', JSON.stringify(state.accountInfo));
        },
        logOut(state) {
            state.accountInfo.loggedIn = false;
            localStorage.setItem('AccountInfo', JSON.stringify(state.accountInfo));
        },
        deleteAccount(state) {
            state.accountInfo = null;
            localStorage.removeItem('AccountInfo');
        }
    }
})

export const accountActions = accountSlice.actions;
export default accountSlice.reducer;