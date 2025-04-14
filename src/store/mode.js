import { createSlice } from "@reduxjs/toolkit";

const getInitialValue = () => {
    const savedValue = localStorage.getItem('theme');
    if (savedValue) return savedValue;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const ToggleModeSlice = createSlice({
    name: 'toggle-mode',
    initialState: { theme: getInitialValue() },
    reducers: {
        toggle(state) {
            state.theme = state.theme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', state.theme);
        }
    }
})

export const ToggleModeActions = ToggleModeSlice.actions;
export default ToggleModeSlice.reducer;