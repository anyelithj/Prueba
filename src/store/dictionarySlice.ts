import { HistoryItem, WordData } from "@/types/dictionary";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DictionaryState {
    currentWord: string;
    data: WordData | null;
    history: HistoryItem[];
    loading: boolean;
    error: string | null;
}

const initialState: DictionaryState = {
    currentWord: '',
    data: null,
    history: [],
    loading: false,
    error: null,
}

export const fetchWordMeaning = createAsyncThunk(
    'dictionary/fetchwordMeaning',
    async(word: string, { rejectWithValue }) => {
        try {                       
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if(!response.ok) {
                if(response.status === 404) {
                    return rejectWithValue('No definitions found for this word');
                } 
                return rejectWithValue('An error ocurred while fetching the definition')
            }
            const data = await response.json();
            return data[0] as WordData;
        } catch(error) {
            return rejectWithValue('Network error ocurred');
        }
    }
);

const dictionarySlice = createSlice({
    name: 'dictionary',
    initialState,
    reducers: {
        setCurrentWord:( state, action: PayloadAction<string>) => {
            state.currentWord = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        clearHistory: (state) => {
            state.history = [];
        },
        setCustomError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWordMeaning.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(fetchWordMeaning.fulfilled, (state, action: PayloadAction<WordData>)=> {
            state.loading = false;
            state.data = action.payload;
            state.error = null;

            const historyItem: HistoryItem = {
                word: action.payload.word,
                timestamp: Date.now(),
                data: action.payload,
            };
            state.history = state.history.filter(item => item.word !== action.payload.word);
            state.history.unshift(historyItem);
        }).addCase(fetchWordMeaning.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    }
})

export const { setCurrentWord, clearError, clearHistory, setCustomError } = dictionarySlice.actions;
export default dictionarySlice.reducer; 

