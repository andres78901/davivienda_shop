/**
 * Tests unitarios de la pantalla de selección de tema.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { themeReducer } from '../../store/themeSlice';
import type { ThemeId } from '../../theme/colors';
import { ThemeScreen } from '../ThemeScreen';

function renderScreen(initialThemeId: ThemeId = 'default') {
  const store = configureStore({
    reducer: { theme: themeReducer },
    preloadedState: { theme: { themeId: initialThemeId } },
  });
  return {
    store,
    ...render(
      <Provider store={store}>
        <ThemeScreen />
      </Provider>
    ),
  };
}

describe('ThemeScreen', () => {
  it('muestra título y las opciones de tema (incluye Por defecto y paletas)', () => {
    renderScreen();
    expect(screen.getByText('Tema de visualización')).toBeTruthy();
    expect(screen.getByText('Selecciona una paleta de colores')).toBeTruthy();
    expect(screen.getByText(/Por defecto/)).toBeTruthy();
    expect(screen.getByText('Paleta 1')).toBeTruthy();
    expect(screen.getByText('Paleta 2')).toBeTruthy();
    expect(screen.getByText('Paleta 3')).toBeTruthy();
    expect(screen.getByText('Paleta 4')).toBeTruthy();
    expect(screen.getByText('Paleta 8')).toBeTruthy();
  });

  it('marca el tema actual con ✓', () => {
    renderScreen('palette2');
    expect(screen.getByText(/Paleta 2 ✓/)).toBeTruthy();
  });

  it('actualiza el tema al tocar una paleta', () => {
    const { store } = renderScreen();
    expect(store.getState().theme.themeId).toBe('default');
    fireEvent.press(screen.getByText('Paleta 1'));
    expect(store.getState().theme.themeId).toBe('palette1');
  });
});
