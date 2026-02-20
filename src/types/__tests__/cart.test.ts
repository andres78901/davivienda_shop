/**
 * Tests para tipos y utilidades del carrito (cartItemSubtotal).
 */

import { cartItemSubtotal } from '../cart';
import type { CartItem } from '../cart';
import type { Product } from '../product';

const mockProduct: Product = {
  id: 1,
  title: 'Test',
  description: 'Desc',
  price: 15.5,
  discountPercentage: 0,
  rating: 5,
  stock: 10,
  brand: 'B',
  category: 'C',
  thumbnail: '',
  images: [],
};

describe('cartItemSubtotal', () => {
  it('calcula precio * cantidad correctamente', () => {
    const item: CartItem = { product: mockProduct, quantity: 2 };
    expect(cartItemSubtotal(item)).toBe(31); // 15.5 * 2
  });

  it('devuelve 0 cuando cantidad es 0', () => {
    const item: CartItem = { product: mockProduct, quantity: 0 };
    expect(cartItemSubtotal(item)).toBe(0);
  });
});
