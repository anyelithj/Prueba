import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FontType = 'serif' | 'sans' | 'mono';
type ThemeMode = 'light' | 'dark';

interface ThemeState {
    font: FontType;
    mode: ThemeMode;
}

const initialState: ThemeState = {
    font: 'serif',
    mode: 'light',
}
const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setFont: (state, action: PayloadAction<FontType>) => {
            state.font = action.payload;
        },
        setMode: (state, action: PayloadAction<ThemeMode>) => {
            state.mode = action.payload;
        },
    },
});

export const { setFont, setMode } =themeSlice.actions;
export default themeSlice.reducer;
