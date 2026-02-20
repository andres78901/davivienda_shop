/**
 * Tests del servicio de API de autenticación (login, addUser).
 */

import { login, addUser } from '../authApi';
import { ApiError } from '../api';

describe('authApi', () => {
  beforeEach(() => {
    globalThis.fetch = jest.fn() as typeof fetch;
  });

  describe('login', () => {
    it('retorna usuario y tokens cuando la respuesta es ok', async () => {
      const mockRes = {
        id: 1,
        username: 'emilys',
        email: 'e@e.com',
        firstName: 'E',
        lastName: 'J',
        accessToken: 'at',
        refreshToken: 'rt',
      };
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockRes),
      });
      const result = await login({ username: 'emilys', password: 'pass' });
      expect(result).toEqual(mockRes);
      expect(result.accessToken).toBe('at');
    });
    it('lanza ApiError cuando la respuesta no es ok', async () => {
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Unauthorized',
        status: 401,
        text: () => Promise.resolve(JSON.stringify({ message: 'Invalid credentials' })),
      });
      try {
        await login({ username: 'x', password: 'y' });
        expect(true).toBe(false);
      } catch (e) {
        expect(e).toBeInstanceOf(ApiError);
        expect((e as ApiError).message).toContain('Invalid credentials');
        expect((e as ApiError).statusCode).toBe(401);
      }
    });
  });

  describe('addUser', () => {
    it('retorna usuario creado cuando la respuesta es ok', async () => {
      const mockRes = {
        id: 209,
        firstName: 'A',
        lastName: 'B',
        email: 'a@b.com',
        username: 'ab',
      };
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockRes),
      });
      const result = await addUser({
        firstName: 'A',
        lastName: 'B',
        email: 'a@b.com',
        username: 'ab',
        password: 'p',
      });
      expect(result.id).toBe(209);
      expect(result.firstName).toBe('A');
    });
    it('lanza ApiError cuando la respuesta no es ok', async () => {
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Bad Request',
        status: 400,
        text: () => Promise.resolve('error'),
      });
      try {
        await addUser({
          firstName: 'A',
          lastName: 'B',
          email: 'a@b.com',
          username: 'ab',
          password: 'p',
        });
        expect(true).toBe(false);
      } catch (e) {
        expect(e).toBeInstanceOf(ApiError);
      }
    });
  });
});
