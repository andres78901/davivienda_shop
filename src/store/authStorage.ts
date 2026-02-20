/**
 * Persistencia del token y usuario en AsyncStorage para Redux auth.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User } from '../types/auth';
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from './authSlice';

export async function getStoredAuth(): Promise<{
  accessToken: string | null;
  user: User | null;
}> {
  try {
    const [token, userJson] = await Promise.all([
      AsyncStorage.getItem(AUTH_TOKEN_KEY),
      AsyncStorage.getItem(AUTH_USER_KEY),
    ]);
  const user = userJson ? (JSON.parse(userJson) as User) : null;
  return { accessToken: token, user };
  } catch {
    return { accessToken: null, user: null };
  }
}

export async function setStoredAuth(user: User, accessToken: string): Promise<void> {
  await Promise.all([
    AsyncStorage.setItem(AUTH_TOKEN_KEY, accessToken),
    AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(user)),
  ]);
}

export async function clearStoredAuth(): Promise<void> {
  await Promise.all([
    AsyncStorage.removeItem(AUTH_TOKEN_KEY),
    AsyncStorage.removeItem(AUTH_USER_KEY),
  ]);
}
