/**
 * Tests unitarios de la pantalla de detalle del producto.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../../store/authSlice';
import { cartReducer } from '../../store/cartSlice';
import { themeReducer } from '../../store/themeSlice';
import { ProductDetailScreen } from '../ProductDetailScreen';
import type { Product } from '../../types/product';

jest.mock('../../native/ToastModule', () => ({
  showToast: jest.fn(),
}));

const mockProduct: Product = {
  id: 10,
  title: 'Producto Detalle',
  description: 'Descripción del producto',
  price: 29.99,
  discountPercentage: 5,
  rating: 4.8,
  stock: 20,
  brand: 'Marca',
  category: 'Categoría',
  thumbnail: 'https://x.com/thumb.jpg',
  images: ['https://x.com/1.jpg', 'https://x.com/2.jpg'],
};

function renderScreen() {
  const store = configureStore({
    reducer: { auth: authReducer, cart: cartReducer, theme: themeReducer },
  });
  return {
    store,
    ...render(
      <Provider store={store}>
        <ProductDetailScreen
          navigation={{} as never}
          route={{ params: { product: mockProduct } } as never}
        />
      </Provider>
    ),
  };
}

describe('ProductDetailScreen', () => {
  it('renderiza datos del producto', () => {
    renderScreen();
    expect(screen.getByText('Producto Detalle')).toBeTruthy();
    expect(screen.getByText('Descripción del producto')).toBeTruthy();
    expect(screen.getByText('Marca')).toBeTruthy();
    expect(screen.getByText('$29.99')).toBeTruthy();
    expect(screen.getByText(/⭐ 4.8/)).toBeTruthy();
    expect(screen.getByText(/Stock: 20/)).toBeTruthy();
  });

  it('despacha addProduct y muestra toast al tocar Agregar al carrito', () => {
    const { store } = renderScreen();
    const { showToast } = require('../../native/ToastModule');
    fireEvent.press(screen.getByLabelText('Agregar al carrito'));
    expect(store.getState().cart.items).toHaveLength(1);
    expect(store.getState().cart.items[0].product.id).toBe(10);
    expect(store.getState().cart.items[0].quantity).toBe(1);
    expect(showToast).toHaveBeenCalledWith('Agregado al carrito');
  });
});
