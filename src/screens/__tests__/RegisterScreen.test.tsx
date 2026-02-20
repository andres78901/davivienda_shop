/**
 * Tests unitarios de RegisterScreen: render, validación y flujo de registro.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { RegisterScreen } from '../RegisterScreen';

jest.mock('../../services/authApi');

const mockNavigate = jest.fn();
const mockNavigation = { navigate: mockNavigate } as never;
const mockAlert = jest.spyOn(Alert, 'alert');

function renderScreen() {
  return render(
    <RegisterScreen navigation={mockNavigation} route={{} as never} />
  );
}

describe('RegisterScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockAlert.mockClear();
    const { addUser } = require('../../services/authApi');
    addUser.mockReset();
  });

  it('renderiza título y campos del formulario', () => {
    renderScreen();
    expect(screen.getByText('Crear cuenta')).toBeTruthy();
    expect(screen.getByPlaceholderText('Nombre')).toBeTruthy();
    expect(screen.getByPlaceholderText('Apellido')).toBeTruthy();
    expect(screen.getByPlaceholderText('Correo')).toBeTruthy();
    expect(screen.getByPlaceholderText('Usuario')).toBeTruthy();
    expect(screen.getByPlaceholderText('Contraseña')).toBeTruthy();
    expect(screen.getByText('Registrarse')).toBeTruthy();
    expect(screen.getByText(/Iniciar sesión/)).toBeTruthy();
  });

  it('navega a Login al tocar el enlace', () => {
    renderScreen();
    fireEvent.press(screen.getByText(/Iniciar sesión/));
    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });

  it('muestra error si faltan campos', async () => {
    renderScreen();
    fireEvent.press(screen.getByText('Registrarse'));
    await waitFor(() => {
      expect(screen.getByText('Todos los campos son obligatorios')).toBeTruthy();
    });
  });

  it('llama a addUser y muestra alert cuando el registro es exitoso', async () => {
    const { addUser } = require('../../services/authApi');
    addUser.mockResolvedValueOnce({
      id: 209,
      firstName: 'A',
      lastName: 'B',
      email: 'a@b.com',
      username: 'ab',
    });

    renderScreen();
    fireEvent.changeText(screen.getByPlaceholderText('Nombre'), 'A');
    fireEvent.changeText(screen.getByPlaceholderText('Apellido'), 'B');
    fireEvent.changeText(screen.getByPlaceholderText('Correo'), 'a@b.com');
    fireEvent.changeText(screen.getByPlaceholderText('Usuario'), 'ab');
    fireEvent.changeText(screen.getByPlaceholderText('Contraseña'), 'pass');
    fireEvent.press(screen.getByText('Registrarse'));

    await waitFor(() => {
      expect(addUser).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: 'A',
          lastName: 'B',
          email: 'a@b.com',
          username: 'ab',
          password: 'pass',
        })
      );
    });
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('Usuario creado', expect.any(String), expect.any(Array));
    });
  });
});
