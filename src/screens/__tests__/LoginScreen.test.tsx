/**
 * Tests unitarios de LoginScreen: render, validación y flujo de login.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../../store/authSlice';
import { LoginScreen } from '../LoginScreen';

jest.mock('../../services/authApi');
jest.mock('../../store/authStorage', () => ({
  setStoredAuth: jest.fn(() => Promise.resolve()),
}));

const mockNavigate = jest.fn();
const mockNavigation = { navigate: mockNavigate } as never;

function renderWithStore() {
  const store = configureStore({ reducer: { auth: authReducer } });
  return render(
    <Provider store={store}>
      <LoginScreen navigation={mockNavigation} route={{} as never} />
    </Provider>
  );
}

describe('LoginScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    const { login } = require('../../services/authApi');
    login.mockReset();
  });

  it('renderiza título y campos de usuario y contraseña', () => {
    renderWithStore();
    expect(screen.getByText('Iniciar sesión')).toBeTruthy();
    expect(screen.getByPlaceholderText('Usuario')).toBeTruthy();
    expect(screen.getByPlaceholderText('Contraseña')).toBeTruthy();
    expect(screen.getByText('Entrar')).toBeTruthy();
    expect(screen.getByText(/Regístrate/)).toBeTruthy();
  });

  it('navega a Register al tocar el enlace', () => {
    renderWithStore();
    fireEvent.press(screen.getByText(/Regístrate/));
    expect(mockNavigate).toHaveBeenCalledWith('Register');
  });

  it('muestra error si se envía sin usuario ni contraseña', async () => {
    renderWithStore();
    fireEvent.press(screen.getByText('Entrar'));
    await waitFor(() => {
      expect(screen.getByText('Usuario y contraseña son obligatorios')).toBeTruthy();
    });
  });

  it('llama a login y setStoredAuth cuando las credenciales son válidas', async () => {
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
      expect(login).toHaveBeenCalledWith({ username: 'u', password: 'p' });
    });
    await waitFor(() => {
      expect(setStoredAuth).toHaveBeenCalled();
    });
  });
});
