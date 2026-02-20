/**
 * Tests unitarios del almacenamiento del carrito por usuario (AsyncStorage).
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadCartForUser, saveCartForUser } from '../cartStorage';
import type { CartItem } from '../../types/cart';
import type { Product } from '../../types/product';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

const mockProduct: Product = {
  id: 1,
  title: 'Test',
  description: 'Desc',
  price: 10,
  discountPercentage: 0,
  rating: 4,
  stock: 5,
  brand: 'B',
  category: 'C',
  thumbnail: 'https://x.com/1.jpg',
  images: ['https://x.com/1.jpg'],
};

const mockItem: CartItem = { product: mockProduct, quantity: 2 };

describe('cartStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loadCartForUser', () => {
    it('retorna array vacío cuando no hay datos', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
      const result = await loadCartForUser(1);
      expect(result).toEqual([]);
    });

    it('retorna ítems guardados para el usuario', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
        JSON.stringify([mockItem])
      );
      const result = await loadCartForUser(1);
      expect(result).toHaveLength(1);
      expect(result[0].product.id).toBe(1);
      expect(result[0].quantity).toBe(2);
    });

    it('retorna array vacío en caso de error', async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValue(new Error('fail'));
      const result = await loadCartForUser(1);
      expect(result).toEqual([]);
    });
  });

  describe('saveCartForUser', () => {
    it('guarda el carrito con la clave del usuario', async () => {
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
      await saveCartForUser(42, [mockItem]);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'daviviendashop-cart-42',
        JSON.stringify([mockItem])
      );
    });

    it('guarda array vacío', async () => {
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
      await saveCartForUser('guest', []);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'daviviendashop-cart-guest',
        '[]'
      );
    });
  });
});
