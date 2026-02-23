/**
 * Tests unitarios de LoginScreen: render, validación, flujo de login y estados.
 */

import React from 'react';
import { Alert } from 'react-native';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer, setError, setLoading } from '../../store/authSlice';
import { LoginScreen } from '../LoginScreen';

jest.mock('../../services/authApi');
jest.mock('../../store/authStorage', () => ({
  setStoredAuth: jest.fn(() => Promise.resolve()),
}));

const mockNavigate = jest.fn();
const mockNavigation = { navigate: mockNavigate } as never;

const getInitialAuthState = () => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null as string | null,
});

function renderWithStore(initialAuth?: { error?: string | null; isLoading?: boolean }) {
  const preloadedState = initialAuth
    ? { auth: { ...getInitialAuthState(), ...initialAuth } }
    : undefined;
  const store = configureStore({
    reducer: { auth: authReducer },
    ...(preloadedState && { preloadedState }),
  });
  return {
    store,
    ...render(
      <Provider store={store}>
        <LoginScreen navigation={mockNavigation} route={{} as never} />
      </Provider>
    ),
  };
}

describe('LoginScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    const { login } = require('../../services/authApi');
    login.mockReset();
  });

  describe('render', () => {
    it('renderiza título y campos de usuario y contraseña', () => {
      renderWithStore();
      expect(screen.getByText('Iniciar sesión')).toBeTruthy();
      expect(screen.getByPlaceholderText('Usuario')).toBeTruthy();
      expect(screen.getByPlaceholderText('Contraseña')).toBeTruthy();
      expect(screen.getByText('Entrar')).toBeTruthy();
      expect(screen.getByText(/Regístrate/)).toBeTruthy();
    });

    it('renderiza el hint de DummyJSON', () => {
      renderWithStore();
      expect(
        screen.getByText(/Usa el usuario y contraseña de DummyJSON/)
      ).toBeTruthy();
    });

    it('no muestra mensaje de error cuando error en store es null', () => {
      renderWithStore();
      expect(screen.queryByText('Usuario y contraseña son obligatorios')).toBeNull();
      expect(screen.queryByTestId('error-message')).toBeNull();
    });

    it('muestra el error del store cuando existe', () => {
      renderWithStore({ error: 'Credenciales inválidas' });
      expect(screen.getByText('Credenciales inválidas')).toBeTruthy();
    });
  });

  describe('validación', () => {
    it('muestra error si se envía sin usuario ni contraseña', async () => {
      renderWithStore();
      fireEvent.press(screen.getByText('Entrar'));
      await waitFor(() => {
        expect(screen.getByText('Usuario y contraseña son obligatorios')).toBeTruthy();
      });
    });

    it('muestra error si solo falta el usuario', async () => {
      renderWithStore();
      fireEvent.changeText(screen.getByPlaceholderText('Contraseña'), 'pass');
      fireEvent.press(screen.getByText('Entrar'));
      await waitFor(() => {
        expect(screen.getByText('Usuario y contraseña son obligatorios')).toBeTruthy();
      });
    });

    it('muestra error si solo falta la contraseña', async () => {
      renderWithStore();
      fireEvent.changeText(screen.getByPlaceholderText('Usuario'), 'user');
      fireEvent.press(screen.getByText('Entrar'));
      await waitFor(() => {
        expect(screen.getByText('Usuario y contraseña son obligatorios')).toBeTruthy();
      });
    });

    it('considera vacíos usuario y contraseña con solo espacios', async () => {
      renderWithStore();
      fireEvent.changeText(screen.getByPlaceholderText('Usuario'), '   ');
      fireEvent.changeText(screen.getByPlaceholderText('Contraseña'), '   ');
      fireEvent.press(screen.getByText('Entrar'));
      await waitFor(() => {
        expect(screen.getByText('Usuario y contraseña son obligatorios')).toBeTruthy();
      });
    });

    it('llama a login con usuario y contraseña recortados (trim)', async () => {
      const { login } = require('../../services/authApi');
      login.mockResolvedValueOnce({
        id: 1,
        username: 'u',
        email: 'e@e.com',
        firstName: 'F',
        lastName: 'L',
        accessToken: 'token',
        refreshToken: 'rt',
      });

      renderWithStore();
      fireEvent.changeText(screen.getByPlaceholderText('Usuario'), '  u  ');
      fireEvent.changeText(screen.getByPlaceholderText('Contraseña'), '  p  ');
      fireEvent.press(screen.getByText('Entrar'));

      await waitFor(() => {
        expect(login).toHaveBeenCalledWith({ username: 'u', password: 'p' });
      });
    });
  });

  describe('navegación', () => {
    it('navega a Register al tocar el enlace', () => {
      renderWithStore();
      fireEvent.press(screen.getByText(/Regístrate/));
      expect(mockNavigate).toHaveBeenCalledWith('Register');
    });
  });

  describe('login exitoso', () => {
    it('llama a login con las credenciales ingresadas', async () => {
      const { login } = require('../../services/authApi');
      login.mockResolvedValueOnce({
        id: 1,
        username: 'u',
        email: 'e@e.com',
        firstName: 'F',
        lastName: 'L',
        accessToken: 'token',
        refreshToken: 'rt',
      });

      renderWithStore();
      fireEvent.changeText(screen.getByPlaceholderText('Usuario'), 'u');
      fireEvent.changeText(screen.getByPlaceholderText('Contraseña'), 'p');
      fireEvent.press(screen.getByText('Entrar'));

      await waitFor(() => {
        expect(login).toHaveBeenCalledWith({ username: 'u', password: 'p' });
      });
    });

    it('despacha setCredentials con user y accessToken', async () => {
      const { login } = require('../../services/authApi');
      const userPayload = {
        id: 1,
        username: 'u',
        email: 'e@e.com',
        firstName: 'F',
        lastName: 'L',
      };
      login.mockResolvedValueOnce({
        ...userPayload,
        accessToken: 'token',
        refreshToken: 'rt',
      });

      const { store } = renderWithStore();
      fireEvent.changeText(screen.getByPlaceholderText('Usuario'), 'u');
      fireEvent.changeText(screen.getByPlaceholderText('Contraseña'), 'p');
      await act(async () => {
        fireEvent.press(screen.getByText('Entrar'));
      });

      await waitFor(() => {
        const state = store.getState().auth;
        expect(state.user).toEqual(userPayload);
        expect(state.accessToken).toBe('token');
        expect(state.isAuthenticated).toBe(true);
      });
    });

    it('guarda credenciales en storage con setStoredAuth', async () => {
      const { login } = require('../../services/authApi');
      const { setStoredAuth } = require('../../store/authStorage');
      login.mockResolvedValueOnce({
        id: 1,
        username: 'u',
        email: 'e@e.com',
        firstName: 'F',
        lastName: 'L',
        accessToken: 'token',
        refreshToken: 'rt',
      });

      renderWithStore();
      fireEvent.changeText(screen.getByPlaceholderText('Usuario'), 'u');
      fireEvent.changeText(screen.getByPlaceholderText('Contraseña'), 'p');
      fireEvent.press(screen.getByText('Entrar'));

      await waitFor(() => {
        expect(setStoredAuth).toHaveBeenCalledWith(
          expect.objectContaining({ id: 1, username: 'u' }),
          'token'
        );
      });
    });

    it('limpia el error del store al enviar credenciales válidas', async () => {
      const { login } = require('../../services/authApi');
      login.mockResolvedValueOnce({
        id: 1,
        username: 'u',
        email: 'e@e.com',
        firstName: 'F',
        lastName: 'L',
        accessToken: 't',
        refreshToken: 'r',
      });

      const { store } = renderWithStore({ error: 'Error anterior' });
      fireEvent.changeText(screen.getByPlaceholderText('Usuario'), 'u');
      fireEvent.changeText(screen.getByPlaceholderText('Contraseña'), 'p');
      fireEvent.press(screen.getByText('Entrar'));

      await waitFor(() => {
        expect(store.getState().auth.error).toBeNull();
      });
    });

    it('despacha setError(null) y setLoading(true) antes del try (líneas 40-42)', async () => {
      const { login } = require('../../services/authApi');
      login.mockImplementation(
        () =>
          new Promise<void>((resolve) => {
            setTimeout(resolve, 50);
          })
      );

      const { store } = renderWithStore({ error: 'Error previo' });
      const dispatchSpy = jest.spyOn(store, 'dispatch');

      fireEvent.changeText(screen.getByPlaceholderText('Usuario'), 'u');
      fireEvent.changeText(screen.getByPlaceholderText('Contraseña'), 'p');
      fireEvent.press(screen.getByText('Entrar'));

      await waitFor(() => {
        expect(dispatchSpy).toHaveBeenCalledWith(setError(null));
        expect(dispatchSpy).toHaveBeenCalledWith(setLoading(true));
      });
    });
  });

  describe('login fallido', () => {
    it('despacha setError y muestra Alert cuando login lanza Error', async () => {
      const { login } = require('../../services/authApi');
      login.mockRejectedValueOnce(new Error('Credenciales incorrectas'));

      const alertSpy = jest.spyOn(Alert, 'alert');
      const { store } = renderWithStore();

      fireEvent.changeText(screen.getByPlaceholderText('Usuario'), 'u');
      fireEvent.changeText(screen.getByPlaceholderText('Contraseña'), 'p');
      await act(async () => {
        fireEvent.press(screen.getByText('Entrar'));
      });

      await waitFor(() => {
        expect(store.getState().auth.error).toBe('Credenciales incorrectas');
      });
      expect(alertSpy).toHaveBeenCalledWith('Error', 'Credenciales incorrectas');
    });

    it('muestra mensaje genérico cuando login lanza algo que no es Error', async () => {
      const { login } = require('../../services/authApi');
      login.mockRejectedValueOnce('string error');

      const alertSpy = jest.spyOn(Alert, 'alert');
      const { store } = renderWithStore();

      fireEvent.changeText(screen.getByPlaceholderText('Usuario'), 'u');
      fireEvent.changeText(screen.getByPlaceholderText('Contraseña'), 'p');
      await act(async () => {
        fireEvent.press(screen.getByText('Entrar'));
      });

      await waitFor(() => {
        expect(store.getState().auth.error).toBe('Error al iniciar sesión');
      });
      expect(alertSpy).toHaveBeenCalledWith('Error', 'Error al iniciar sesión');
    });

    it('vuelve a deshabilitar loading (setLoading false) tras error', async () => {
      const { login } = require('../../services/authApi');
      login.mockRejectedValueOnce(new Error('Fail'));

      const { store } = renderWithStore();

      fireEvent.changeText(screen.getByPlaceholderText('Usuario'), 'u');
      fireEvent.changeText(screen.getByPlaceholderText('Contraseña'), 'p');
      await act(async () => {
        fireEvent.press(screen.getByText('Entrar'));
      });

      await waitFor(() => {
        expect(store.getState().auth.isLoading).toBe(false);
      });
    });
  });

  describe('estado de carga', () => {
    it('activa isLoading y oculta el texto Entrar mientras carga', async () => {
      const { login } = require('../../services/authApi');
      let resolveLogin: (v: unknown) => void;
      login.mockImplementation(
        () =>
          new Promise((resolve) => {
            resolveLogin = resolve;
          })
      );

      const { store } = renderWithStore();
      fireEvent.changeText(screen.getByPlaceholderText('Usuario'), 'u');
      fireEvent.changeText(screen.getByPlaceholderText('Contraseña'), 'p');
      await act(async () => {
        fireEvent.press(screen.getByText('Entrar'));
      });

      await waitFor(() => {
        expect(store.getState().auth.isLoading).toBe(true);
      });
      expect(screen.queryByText('Entrar')).toBeNull();

      resolveLogin!({
        id: 1,
        username: 'u',
        email: 'e@e.com',
        firstName: 'F',
        lastName: 'L',
        accessToken: 't',
        refreshToken: 'r',
      });
    });

    it('vuelve a mostrar "Entrar" y habilita botón tras login exitoso', async () => {
      const { login } = require('../../services/authApi');
      login.mockResolvedValueOnce({
        id: 1,
        username: 'u',
        email: 'e@e.com',
        firstName: 'F',
        lastName: 'L',
        accessToken: 't',
        refreshToken: 'r',
      });

      renderWithStore();
      fireEvent.changeText(screen.getByPlaceholderText('Usuario'), 'u');
      fireEvent.changeText(screen.getByPlaceholderText('Contraseña'), 'p');
      fireEvent.press(screen.getByText('Entrar'));

      await waitFor(() => {
        expect(screen.getByText('Entrar')).toBeTruthy();
      });
    });
  });
});
