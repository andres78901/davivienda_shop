/**
 * Servicio de API para autenticación y usuarios (DummyJSON).
 * Documentación: https://dummyjson.com/docs/auth y https://dummyjson.com/docs/users
 */

import type { LoginRequest, LoginResponse, AddUserRequest, AddUserResponse } from '../types/auth';
import { ApiError } from './api';

const BASE_URL = 'https://dummyjson.com';

/**
 * Login: POST /auth/login.
 * Retorna usuario y tokens (accessToken, refreshToken).
 */
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: credentials.username,
      password: credentials.password,
      expiresInMins: credentials.expiresInMins ?? 60,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    let message = `Error al iniciar sesión: ${response.statusText}`;
    try {
      const json = JSON.parse(text) as { message?: string };
      if (json.message) message = json.message;
    } catch {
      // use default message
    }
    throw new ApiError(message, response.status, text);
  }

  return (await response.json()) as LoginResponse;
}

/**
 * Crear usuario (simulado): POST /users/add.
 * La API no persiste el usuario; retorna el objeto creado con un id.
 */
export async function addUser(data: AddUserRequest): Promise<AddUserResponse> {
  const response = await fetch(`${BASE_URL}/users/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      username: data.username,
      password: data.password,
      age: data.age ?? 25,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    let message = `Error al crear usuario: ${response.statusText}`;
    try {
      const json = JSON.parse(text) as { message?: string };
      if (json.message) message = json.message;
    } catch {
      // use default
    }
    throw new ApiError(message, response.status, text);
  }

  return (await response.json()) as AddUserResponse;
}
