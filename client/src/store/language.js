import { createSlice } from "@reduxjs/toolkit";

const languages = [
    "Eng",
    "Hindi",
    "Bangla"
]

const languageSlice = createSlice({
    name: 'language',
    initialState: {
        languages,
        selectedLanguage: languages[0]
    },
    reducers: {
        setLanguage(state, action) {
            state.selectedLanguage = action.payload;
        }
    }
})

export const languageActions = languageSlice.actions;
export default languageSlice.reducer;