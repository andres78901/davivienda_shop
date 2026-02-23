/**
 * Tests unitarios del header principal: título, usuario y botón carrito.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../../store/authSlice';
import { cartReducer } from '../../store/cartSlice';
import { MainHeader } from '../MainHeader';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));

function renderWithStore(authUser?: { id: number; username: string } | null) {
  const store = configureStore({
    reducer: { auth: authReducer, cart: cartReducer },
    preloadedState: authUser
      ? { auth: { user: authUser, accessToken: 't', isAuthenticated: true, isLoading: false, error: null }, cart: { items: [] } }
      : undefined,
  });
  const onCartPress = jest.fn();
  return {
    store,
    onCartPress,
    ...render(
      <Provider store={store}>
        <MainHeader title="Productos" onCartPress={onCartPress} />
      </Provider>
    ),
  };
}

describe('MainHeader', () => {
  it('renderiza el título', () => {
    renderWithStore();
    expect(screen.getByText('Productos')).toBeTruthy();
  });

  it('no muestra la línea de usuario cuando no hay usuario autenticado', () => {
    renderWithStore(null);
    expect(screen.queryByText(/Conectado como/)).toBeNull();
  });

  it('muestra el nombre de usuario cuando está autenticado', () => {
    renderWithStore({ id: 1, username: 'juan' });
    expect(screen.getByText(/Conectado como/)).toBeTruthy();
    expect(screen.getByText('juan')).toBeTruthy();
  });

  it('llama onCartPress al tocar el botón del carrito', () => {
    const { onCartPress } = renderWithStore();
    fireEvent.press(screen.getByLabelText('Ir al carrito'));
    expect(onCartPress).toHaveBeenCalledTimes(1);
  });
});
