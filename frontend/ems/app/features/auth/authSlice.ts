import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { TTokens } from 'types/token';
import type { TLoginUser, TUser } from 'types/user';
import userService from '@/services/authService';
import { IUserProfile } from '@/services/authService/types';
import { UserProfile_user } from '@/services/authService/__generated__/UserProfile';

type TInitialState = {
  loading: boolean | null;
  user: UserProfile_user | null;
  error: string | null;
};

const initialState: TInitialState = {
  loading: null,
  user: null,
  error: null
};

export const loginUser: AsyncThunk<UserProfile_user, TLoginUser, {}> =
  createAsyncThunk('auth/login', async (user, thunkApi) => {
    try {
      const tokens: TTokens = await userService.loginUser(user);
      localStorage.setItem('rToken', tokens.refreshToken);
      sessionStorage.setItem('aToken', tokens.accessToken);

      const userData: IUserProfile['user'] = await userService.getUserProfile();
      return userData;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  });

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload as string;
      });
  }
});

export const action = authSlice.actions;
export default authSlice.reducer;
