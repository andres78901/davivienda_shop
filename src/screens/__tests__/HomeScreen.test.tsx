/**
 * Tests unitarios de la pantalla principal (lista de productos).
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../../store/authSlice';
import { cartReducer } from '../../store/cartSlice';
import { HomeScreen } from '../HomeScreen';
import type { Product } from '../../types/product';
import { fetchProducts, ApiError } from '../../services/api';

jest.mock('../../services/api', () => ({
  ...jest.requireActual('../../services/api'),
  fetchProducts: jest.fn(),
}));

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Producto Uno',
    description: 'D1',
    price: 10,
    discountPercentage: 0,
    rating: 4,
    stock: 5,
    brand: 'B1',
    category: 'C1',
    thumbnail: 'https://x.com/1.jpg',
    images: ['https://x.com/1.jpg'],
  },
];

const mockNavigate = jest.fn();
function renderScreen() {
  const store = configureStore({
    reducer: { auth: authReducer, cart: cartReducer },
  });
  return render(
    <Provider store={store}>
      <HomeScreen
        navigation={{ navigate: mockNavigate } as never}
      />
    </Provider>
  );
}

describe('HomeScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    (fetchProducts as jest.Mock).mockReset();
  });

  it('muestra loading inicial', () => {
    (fetchProducts as jest.Mock).mockImplementation(() => new Promise(() => {}));
    renderScreen();
    expect(screen.getByText('Cargando productos...')).toBeTruthy();
  });

  it('muestra error y botón Reintentar cuando falla la carga', async () => {
    (fetchProducts as jest.Mock).mockRejectedValueOnce(new ApiError('Error de red', 500));
    renderScreen();
    await waitFor(
      () => {
        expect(screen.getByText('Error de red')).toBeTruthy();
        expect(screen.getByText('Reintentar')).toBeTruthy();
      },
      { timeout: 5000 }
    );
  });

  it('muestra mensaje genérico cuando el error no es ApiError', async () => {
    (fetchProducts as jest.Mock).mockRejectedValueOnce(new Error('fallo'));
    renderScreen();
    await waitFor(() => {
      expect(screen.getByText('No se pudo cargar la lista de productos')).toBeTruthy();
    });
  });

  it('muestra la lista de productos y navega al detalle al tocar uno', async () => {
    (fetchProducts as jest.Mock).mockResolvedValueOnce({ products: mockProducts, total: 1, skip: 0, limit: 10 });
    renderScreen();
    await waitFor(() => {
      expect(screen.getByText('Producto Uno')).toBeTruthy();
    });
    fireEvent.press(screen.getByLabelText('Ver Producto Uno'));
    expect(mockNavigate).toHaveBeenCalledWith('ProductDetail', { product: mockProducts[0] });
  });

  it('llama fetchProducts de nuevo al tocar Reintentar', async () => {
    (fetchProducts as jest.Mock)
      .mockRejectedValueOnce(new ApiError('Error', 500))
      .mockResolvedValueOnce({ products: mockProducts, total: 1, skip: 0, limit: 10 });
    renderScreen();
    await waitFor(() => expect(screen.getByText('Reintentar')).toBeTruthy(), { timeout: 5000 });
    fireEvent.press(screen.getByText('Reintentar'));
    await waitFor(() => expect(screen.getByText('Producto Uno')).toBeTruthy(), { timeout: 5000 });
    expect(fetchProducts).toHaveBeenCalledTimes(2);
  });
});
