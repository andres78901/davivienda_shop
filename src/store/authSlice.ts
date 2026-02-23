/**
 * Slice Redux para autenticación: usuario, token y acciones login/logout.
 * Los thunks loginThunk y registerThunk encapsulan las llamadas a authApi.
 */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../types/auth';
import { loginThunk } from './authThunks';

const AUTH_TOKEN_KEY = '@DaviviendaShop:accessToken';
const AUTH_USER_KEY = '@DaviviendaShop:user';

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; accessToken: string }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          'Error al iniciar sesión';
      });
  },
});

export const { setCredentials, setLoading, setError, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

export { AUTH_TOKEN_KEY, AUTH_USER_KEY };
