/**
 * Tests unitarios de la pantalla de perfil del usuario.
 */

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../../store/authSlice';
import { cartReducer } from '../../store/cartSlice';
import { themeReducer } from '../../store/themeSlice';
import { ProfileScreen } from '../ProfileScreen';
import type { User } from '../../types/auth';

function renderWithStore(user: User | null) {
  const store = configureStore({
    reducer: { auth: authReducer, cart: cartReducer, theme: themeReducer },
    preloadedState: {
      auth: {
        user,
        accessToken: user ? 'token' : null,
        isAuthenticated: !!user,
        isLoading: false,
        error: null,
      },
    },
  });
  return render(
    <Provider store={store}>
      <ProfileScreen navigation={{} as never} route={{} as never} />
    </Provider>
  );
}

const mockUser: User = {
  id: 1,
  username: 'juan',
  email: 'juan@test.com',
  firstName: 'Juan',
  lastName: 'Pérez',
  gender: 'male',
  image: 'https://x.com/avatar.jpg',
};

describe('ProfileScreen', () => {
  it('muestra mensaje cuando no hay usuario', () => {
    renderWithStore(null);
    expect(screen.getByText('No hay datos de usuario disponibles.')).toBeTruthy();
  });

  it('muestra datos del usuario cuando está autenticado', () => {
    renderWithStore(mockUser);
    expect(screen.getByText('Datos personales')).toBeTruthy();
    expect(screen.getByText('juan')).toBeTruthy();
    expect(screen.getByText('juan@test.com')).toBeTruthy();
    expect(screen.getByText('Juan')).toBeTruthy();
    expect(screen.getByText('Pérez')).toBeTruthy();
    expect(screen.getByText('male')).toBeTruthy();
  });

  it('muestra — para campos vacíos o undefined', () => {
    renderWithStore({
      ...mockUser,
      gender: undefined,
      image: undefined,
    });
    expect(screen.getByText('Datos personales')).toBeTruthy();
    const dashes = screen.getAllByText('—');
    expect(dashes.length).toBeGreaterThanOrEqual(1);
  });
});
