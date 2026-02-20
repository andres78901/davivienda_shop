/**
 * Tipos para autenticación y usuario (API DummyJSON Auth y Users).
 */

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender?: string;
  image?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
  expiresInMins?: number;
}

export interface LoginResponse extends User {
  accessToken: string;
  refreshToken: string;
}

export interface AddUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  age?: number;
}

export interface AddUserResponse extends User {
  age?: number;
}
