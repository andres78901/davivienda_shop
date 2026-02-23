/**
 * Servicio de API para autenticación y usuarios (DummyJSON).
 * Documentación: https://dummyjson.com/docs/auth y https://dummyjson.com/docs/users
 */

import type { LoginRequest, LoginResponse, AddUserRequest, AddUserResponse } from '../types/auth';
import { ApiError } from './api';

const BASE_URL = 'https://dummyjson.com';
const DEFAULT_TIMEOUT_MS = 10000;
const DEFAULT_HEADERS = { 'Content-Type': 'application/json', Accept: 'application/json' };

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Login: POST /auth/login.
 * Retorna usuario y tokens (accessToken, refreshToken).
 */
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  if (!isNonEmptyString(credentials.username) || !isNonEmptyString(credentials.password)) {
    throw new ApiError('Username y password son requeridos', 400, 'validation');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
        expiresInMins: credentials.expiresInMins ?? 60,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const text = await response.text();
      let message = `Error al iniciar sesión: ${response.statusText}`;
      try {
        const json = JSON.parse(text) as { message?: string };
        if (json && json.message) message = json.message;
      } catch {
        // keep default
      }
      throw new ApiError(message, response.status, text);
    }

    return (await response.json()) as LoginResponse;
  } catch (err: unknown) {
    clearTimeout(timeout);
    if (err && typeof err === 'object' && 'name' in err && (err as any).name === 'AbortError') {
      throw new ApiError('Timeout al conectar con el servidor', 0, String(err));
    }
    if (err instanceof ApiError) throw err;
    throw new ApiError('Error de red al iniciar sesión', 0, String(err));
  }
}

/**
 * Crear usuario (simulado): POST /users/add.
 * La API no persiste el usuario; retorna el objeto creado con un id.
 */
export async function addUser(data: AddUserRequest): Promise<AddUserResponse> {
  if (!isNonEmptyString(data.firstName) || !isNonEmptyString(data.lastName)) {
    throw new ApiError('Nombre y apellido son requeridos', 400, 'validation');
  }
  if (!isNonEmptyString(data.username) || !isNonEmptyString(data.password)) {
    throw new ApiError('Username y password son requeridos', 400, 'validation');
  }
  if (!isNonEmptyString(data.email) || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
    throw new ApiError('Email inválido', 400, 'validation');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch(`${BASE_URL}/users/add`, {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        username: data.username,
        password: data.password,
        age: data.age ?? 25,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const text = await response.text();
      let message = `Error al crear usuario: ${response.statusText}`;
      try {
        const json = JSON.parse(text) as { message?: string };
        if (json && json.message) message = json.message;
      } catch {
        // keep default
      }
      throw new ApiError(message, response.status, text);
    }

    return (await response.json()) as AddUserResponse;
  } catch (err: unknown) {
    clearTimeout(timeout);
    if (err && typeof err === 'object' && 'name' in err && (err as any).name === 'AbortError') {
      throw new ApiError('Timeout al conectar con el servidor', 0, String(err));
    }
    if (err instanceof ApiError) throw err;
    throw new ApiError('Error de red al crear usuario', 0, String(err));
  }
}
