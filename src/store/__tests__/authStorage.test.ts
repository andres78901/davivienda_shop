/**
 * Tests unitarios de persistencia de auth (AsyncStorage).
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStoredAuth, setStoredAuth, clearStoredAuth } from '../authStorage';
import type { User } from '../../types/auth';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

const mockUser: User = {
  id: 1,
  username: 'u',
  email: 'e@e.com',
  firstName: 'F',
  lastName: 'L',
};

describe('authStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getStoredAuth', () => {
    it('retorna token y user cuando existen', async () => {
      (AsyncStorage.getItem as jest.Mock)
        .mockResolvedValueOnce('token-123')
        .mockResolvedValueOnce(JSON.stringify(mockUser));
      const result = await getStoredAuth();
      expect(result.accessToken).toBe('token-123');
      expect(result.user).toEqual(mockUser);
    });
    it('retorna null cuando no hay datos', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
      const result = await getStoredAuth();
      expect(result.accessToken).toBeNull();
      expect(result.user).toBeNull();
    });
    it('retorna null en caso de error', async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValue(new Error('fail'));
      const result = await getStoredAuth();
      expect(result.accessToken).toBeNull();
      expect(result.user).toBeNull();
    });
  });

  describe('setStoredAuth', () => {
    it('guarda token y user', async () => {
      await setStoredAuth(mockUser, 'token');
      expect(AsyncStorage.setItem).toHaveBeenCalledTimes(2);
    });
  });

  describe('clearStoredAuth', () => {
    it('elimina token y user', async () => {
      await clearStoredAuth();
      expect(AsyncStorage.removeItem).toHaveBeenCalledTimes(2);
    });
  });
});
