import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/user/userSlice';
import authReducer from 'app/features/auth/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
