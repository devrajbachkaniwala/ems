import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TTokens } from 'types/token';

type TInitialState = {
    value: TTokens | null;
};

const initialState: TInitialState = {
    value: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, { payload }: PayloadAction<TTokens>) => {
            state.value = payload;
        }
    }
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;