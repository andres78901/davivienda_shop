/**
 * Tests unitarios de la pantalla del carrito.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../../store/authSlice';
import { cartReducer, addProduct, incrementQuantity, decrementQuantity, removeProduct } from '../../store/cartSlice';
import { CartScreen } from '../CartScreen';
import type { Product } from '../../types/product';
import type { CartItem } from '../../types/cart';

const mockProduct: Product = {
  id: 1,
  title: 'Producto A',
  description: 'D',
  price: 15,
  discountPercentage: 0,
  rating: 4,
  stock: 5,
  brand: 'B',
  category: 'C',
  thumbnail: 'https://x.com/1.jpg',
  images: ['https://x.com/1.jpg'],
};

function renderWithStore(items: CartItem[] = []) {
  const store = configureStore({
    reducer: { auth: authReducer, cart: cartReducer },
    preloadedState: { cart: { items } },
  });
  return {
    store,
    ...render(
      <Provider store={store}>
        <CartScreen navigation={{} as never} route={{} as never} />
      </Provider>
    ),
  };
}

describe('CartScreen', () => {
  it('muestra mensaje de carrito vacío cuando no hay ítems', () => {
    renderWithStore();
    expect(screen.getByText('Tu carrito está vacío')).toBeTruthy();
  });

  it('muestra lista de ítems, subtotal y total cuando hay productos', () => {
    renderWithStore([{ product: mockProduct, quantity: 2 }]);
    expect(screen.getByText('Producto A')).toBeTruthy();
    expect(screen.getByText(/\$15\.00 × 2 = \$30\.00/)).toBeTruthy();
    expect(screen.getByText('Total')).toBeTruthy();
    expect(screen.getByText('$30.00')).toBeTruthy();
  });

  it('incrementa cantidad al tocar +', () => {
    const { store } = renderWithStore([{ product: mockProduct, quantity: 1 }]);
    fireEvent.press(screen.getByLabelText('Aumentar cantidad'));
    expect(store.getState().cart.items[0].quantity).toBe(2);
  });

  it('decrementa cantidad al tocar −', () => {
    const { store } = renderWithStore([{ product: mockProduct, quantity: 2 }]);
    fireEvent.press(screen.getByLabelText('Disminuir cantidad'));
    expect(store.getState().cart.items[0].quantity).toBe(1);
  });

  it('elimina el ítem al tocar Eliminar', () => {
    const { store } = renderWithStore([{ product: mockProduct, quantity: 1 }]);
    fireEvent.press(screen.getByLabelText('Eliminar del carrito'));
    expect(store.getState().cart.items).toHaveLength(0);
  });
});
