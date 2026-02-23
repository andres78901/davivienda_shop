/**
 * Tests unitarios del botón del carrito en el header.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../../store/authSlice';
import { cartReducer, addProduct } from '../../store/cartSlice';
import { HeaderCartButton } from '../HeaderCartButton';
import type { Product } from '../../types/product';

const mockProduct: Product = {
  id: 1,
  title: 'P',
  description: 'D',
  price: 10,
  discountPercentage: 0,
  rating: 4,
  stock: 5,
  brand: 'B',
  category: 'C',
  thumbnail: 'https://x.com/1.jpg',
  images: ['https://x.com/1.jpg'],
};

function renderWithStore(preloadedState?: { cart?: { items: { product: Product; quantity: number }[] } }) {
  const store = configureStore({
    reducer: { auth: authReducer, cart: cartReducer },
    preloadedState,
  });
  const onPress = jest.fn();
  return {
    store,
    onPress,
    ...render(
      <Provider store={store}>
        <HeaderCartButton onPress={onPress} />
      </Provider>
    ),
  };
}

describe('HeaderCartButton', () => {
  it('renderiza el ícono del carrito y no muestra badge cuando el carrito está vacío', () => {
    renderWithStore();
    expect(screen.getByLabelText('Ir al carrito')).toBeTruthy();
    expect(screen.getByText('🛒')).toBeTruthy();
    expect(screen.queryByText('1')).toBeNull();
  });

  it('muestra el badge con la cantidad cuando hay ítems en el carrito', () => {
    renderWithStore({
      cart: { items: [{ product: mockProduct, quantity: 3 }] },
    });
    expect(screen.getByText('3')).toBeTruthy();
  });

  it('llama onPress al tocar el botón', () => {
    const { onPress } = renderWithStore();
    fireEvent.press(screen.getByLabelText('Ir al carrito'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
