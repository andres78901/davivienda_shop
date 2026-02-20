/**
 * Tests unitarios del slice Redux de autenticación.
 */

import { authReducer, setCredentials, setLoading, setError, logout } from '../authSlice';
import type { AuthState } from '../authSlice';
import type { User } from '../../types/auth';

const mockUser: User = {
  id: 1,
  username: 'testuser',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
};
const mockToken = 'fake-jwt-token';

describe('authSlice', () => {
  const initialState: AuthState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };

  it('tiene estado inicial correcto', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('setCredentials', () => {
    it('establece usuario, token e isAuthenticated', () => {
      const state = authReducer(
        initialState,
        setCredentials({ user: mockUser, accessToken: mockToken })
      );
      expect(state.user).toEqual(mockUser);
      expect(state.accessToken).toBe(mockToken);
      expect(state.isAuthenticated).toBe(true);
      expect(state.error).toBeNull();
    });
  });

  describe('setLoading', () => {
    it('establece isLoading en true', () => {
      const state = authReducer(initialState, setLoading(true));
      expect(state.isLoading).toBe(true);
    });
    it('establece isLoading en false', () => {
      const state = authReducer({ ...initialState, isLoading: true }, setLoading(false));
      expect(state.isLoading).toBe(false);
    });
  });

  describe('setError', () => {
    it('establece mensaje de error', () => {
      const state = authReducer(initialState, setError('Error de login'));
      expect(state.error).toBe('Error de login');
    });
    it('limpia error con null', () => {
      const state = authReducer(
        { ...initialState, error: 'Algo falló' },
        setError(null)
      );
      expect(state.error).toBeNull();
    });
  });

  describe('logout', () => {
    it('resetea usuario, token e isAuthenticated', () => {
      const stateWithUser: AuthState = {
        ...initialState,
        user: mockUser,
        accessToken: mockToken,
        isAuthenticated: true,
      };
      const state = authReducer(stateWithUser, logout());
      expect(state.user).toBeNull();
      expect(state.accessToken).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.error).toBeNull();
    });
  });
});
