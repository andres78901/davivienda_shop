/**
 * Tests unitarios del menú hamburguesa: abrir menú, Carrito y Salir.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer, logout } from '../../store/authSlice';
import { HamburgerMenu } from '../HamburgerMenu';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));
jest.mock('../../store/authStorage', () => ({
  clearStoredAuth: jest.fn(() => Promise.resolve()),
}));

function renderWithStore() {
  const store = configureStore({ reducer: { auth: authReducer } });
  return { store, ...render(
    <Provider store={store}>
      <HamburgerMenu />
    </Provider>
  ) };
}

describe('HamburgerMenu', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza el botón del menú con accesibilidad', () => {
    renderWithStore();
    const trigger = screen.getByLabelText('Abrir menú');
    expect(trigger).toBeTruthy();
    expect(screen.getByText('☰')).toBeTruthy();
  });

  it('abre el menú al tocar el ícono y muestra Carrito y Salir', () => {
    renderWithStore();
    fireEvent.press(screen.getByLabelText('Abrir menú'));
    expect(screen.getByText('Menú')).toBeTruthy();
    expect(screen.getByLabelText('Ir al carrito')).toBeTruthy();
    expect(screen.getByLabelText('Cerrar sesión')).toBeTruthy();
    expect(screen.getByText('Carrito')).toBeTruthy();
    expect(screen.getByText('Salir')).toBeTruthy();
  });

  it('navega a Cart al tocar Carrito', () => {
    renderWithStore();
    fireEvent.press(screen.getByLabelText('Abrir menú'));
    fireEvent.press(screen.getByLabelText('Ir al carrito'));
    expect(mockNavigate).toHaveBeenCalledWith('Cart');
  });

  it('despacha logout y llama clearStoredAuth al tocar Salir', async () => {
    const { clearStoredAuth } = require('../../store/authStorage');
    const store = configureStore({ reducer: { auth: authReducer } });
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    render(
      <Provider store={store}>
        <HamburgerMenu />
      </Provider>
    );
    fireEvent.press(screen.getByLabelText('Abrir menú'));
    fireEvent.press(screen.getByLabelText('Cerrar sesión'));
    await Promise.resolve();
    expect(clearStoredAuth).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({ type: 'auth/logout' }));
  });
});
