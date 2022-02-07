import { AsyncThunk, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from 'axios';
import { TRegisterUser, TUser, TLoginUser } from "types/user";
import { TToken } from "../../../types/token";
import userService from "../../services/userService";
import { Env } from "class/Env";

/* export const registerUser: AsyncThunk<TUser, TRegisterUser, {} > = createAsyncThunk(
    'user/registerUserStatus', 
    async (user: TRegisterUser, thunkApi) => {
        try {
            const res: AxiosResponse<TUser> = await axios.post<TUser, AxiosResponse<TUser>, TRegisterUser>(
                `${Env.authUrl}/register`,
                user
            );

            return res.data;
        } catch(err: any) {
            return thunkApi.rejectWithValue(`${err.response.data.errorCode}: ${err.response.data.message}`);
        }
        

    }
); */

/* export const loginUser: AsyncThunk<TToken, TLoginUser, {} > = createAsyncThunk(
    'user/loginUserStatus', 
    async (userLogin: TLoginUser, thunkApi) => {
        try {
            const res: TToken = await userService.loginUser(userLogin);

            return res;
        } catch(err: any) {
            return thunkApi.rejectWithValue(`${err.message}`);
        }
    }
); */


type TInitialState = {
    value: TToken | null;
}

const initialState: TInitialState = {
    value: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserState: (state, { payload }: PayloadAction<TToken>) => {
            state.value = payload;
        }
    },
    extraReducers: (builder) => {
        /* builder.addCase(registerUser.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.data = payload;
            state.error = null;
        });

        builder.addCase(registerUser.rejected, (state, { payload }) => {
            state.loading = false;
            state.data = null;
            state.error = payload as string;
        }); */

      /*   builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            state.loading = true;
            state.data = payload;
            state.error = null;
        });
        
        builder.addCase(loginUser.rejected, (state, { payload }) => {
            state.loading = true;
            state.data = null;
            state.error = payload as string;
        }); */

    }
});

export const { setUserState } = userSlice.actions;
export default userSlice.reducer;