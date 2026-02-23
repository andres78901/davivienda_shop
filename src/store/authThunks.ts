/**
 * Thunks de Redux para autenticación: login y registro.
 * Usan solo la capa global de servicios (serviceCalls).
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import type { LoginRequest, AddUserRequest } from '../types/auth';
import { auth } from './serviceCalls';

/** Login: llama a la API, persiste en storage y retorna user + accessToken para el reducer. */
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest, thunkAPI) => {
    try {
      const res = await auth.login(credentials);
      const { accessToken, refreshToken: _ref, ...user } = res;
      await auth.setStoredAuth(user, accessToken);
      return { user, accessToken };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Error al iniciar sesión';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/** Registro: llama a la API y retorna el usuario creado (el componente muestra el modal). */
export const registerThunk = createAsyncThunk(
  'auth/register',
  (data: AddUserRequest) => auth.addUser(data)
);
