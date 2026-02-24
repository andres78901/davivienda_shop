/**
 * Tests unitarios de la tarjeta de producto.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { themeReducer } from '../../store/themeSlice';
import { ProductCard } from '../ProductCard';
import type { Product } from '../../types/product';

function renderWithStore(ui: React.ReactElement) {
  const store = configureStore({ reducer: { theme: themeReducer } });
  return render(<Provider store={store}>{ui}</Provider>);
}

const mockProduct: Product = {
  id: 42,
  title: 'Producto prueba',
  description: 'Desc',
  price: 99.5,
  discountPercentage: 10,
  rating: 4.5,
  stock: 10,
  brand: 'Marca',
  category: 'Cat',
  thumbnail: 'https://example.com/img.jpg',
  images: ['https://example.com/img.jpg'],
};

describe('ProductCard', () => {
  it('renderiza título, precio e imagen del producto', () => {
    renderWithStore(<ProductCard product={mockProduct} onPress={() => {}} />);
    expect(screen.getByText('Producto prueba')).toBeTruthy();
    expect(screen.getByText('$99.50')).toBeTruthy();
    expect(screen.getByLabelText('Ver Producto prueba')).toBeTruthy();
  });

  it('llama onPress al tocar la tarjeta', () => {
    const onPress = jest.fn();
    renderWithStore(<ProductCard product={mockProduct} onPress={onPress} />);
    fireEvent.press(screen.getByLabelText('Ver Producto prueba'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
