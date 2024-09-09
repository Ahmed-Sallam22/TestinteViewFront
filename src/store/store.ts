import { configureStore } from '@reduxjs/toolkit';
import userReducer, { setRoleFromStorage } from './userSlice.ts';
import authApi from '../api/authApi.ts';

const store = configureStore({
  reducer: {
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

store.dispatch(setRoleFromStorage());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
