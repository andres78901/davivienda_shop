/**
 * Tests unitarios del store del carrito: agregar, eliminar, incrementar, decrementar y total.
 */

import { act, renderHook } from '@testing-library/react-native';
import { useCartStore } from '../cartStore';
import type { Product } from '../../types/product';

const mockProduct1: Product = {
  id: 1,
  title: 'Product 1',
  description: 'Desc 1',
  price: 10,
  discountPercentage: 0,
  rating: 4.5,
  stock: 10,
  brand: 'Brand1',
  category: 'cat1',
  thumbnail: 'https://example.com/1.jpg',
  images: ['https://example.com/1.jpg'],
};

const mockProduct2: Product = {
  id: 2,
  title: 'Product 2',
  description: 'Desc 2',
  price: 25,
  discountPercentage: 10,
  rating: 4,
  stock: 5,
  brand: 'Brand2',
  category: 'cat2',
  thumbnail: 'https://example.com/2.jpg',
  images: ['https://example.com/2.jpg'],
};

beforeEach(() => {
  act(() => {
    useCartStore.setState({ items: [] });
  });
});

describe('cartStore', () => {
  describe('addProduct', () => {
    it('agrega un producto nuevo al carrito', () => {
      const { result } = renderHook(() => useCartStore.getState());
      act(() => {
        result.current.addProduct(mockProduct1);
      });
      expect(useCartStore.getState().items).toHaveLength(1);
      expect(useCartStore.getState().items[0].product.id).toBe(1);
      expect(useCartStore.getState().items[0].quantity).toBe(1);
    });

    it('incrementa cantidad si el producto ya está en el carrito', () => {
      const { result } = renderHook(() => useCartStore.getState());
      act(() => {
        result.current.addProduct(mockProduct1);
        result.current.addProduct(mockProduct1, 2);
      });
      expect(useCartStore.getState().items).toHaveLength(1);
      expect(useCartStore.getState().items[0].quantity).toBe(3);
    });
  });

  describe('removeProduct', () => {
    it('elimina el producto del carrito', () => {
      const { result } = renderHook(() => useCartStore.getState());
      act(() => {
        result.current.addProduct(mockProduct1);
        result.current.removeProduct(mockProduct1.id);
      });
      expect(useCartStore.getState().items).toHaveLength(0);
    });

    it('no hace nada si el producto no está en el carrito', () => {
      const { result } = renderHook(() => useCartStore.getState());
      act(() => {
        result.current.addProduct(mockProduct1);
        result.current.removeProduct(999);
      });
      expect(useCartStore.getState().items).toHaveLength(1);
    });
  });

  describe('incrementQuantity', () => {
    it('aumenta la cantidad del producto', () => {
      const { result } = renderHook(() => useCartStore.getState());
      act(() => {
        result.current.addProduct(mockProduct1);
        result.current.incrementQuantity(mockProduct1.id);
      });
      expect(useCartStore.getState().items[0].quantity).toBe(2);
    });
  });

  describe('decrementQuantity', () => {
    it('disminuye la cantidad y elimina el ítem si llega a 0', () => {
      const { result } = renderHook(() => useCartStore.getState());
      act(() => {
        result.current.addProduct(mockProduct1);
        result.current.decrementQuantity(mockProduct1.id);
      });
      expect(useCartStore.getState().items).toHaveLength(0);
    });

    it('disminuye la cantidad sin eliminar si es mayor que 1', () => {
      const { result } = renderHook(() => useCartStore.getState());
      act(() => {
        result.current.addProduct(mockProduct1, 3);
        result.current.decrementQuantity(mockProduct1.id);
      });
      expect(useCartStore.getState().items[0].quantity).toBe(2);
    });
  });

  describe('getTotal', () => {
    it('devuelve 0 cuando el carrito está vacío', () => {
      const { result } = renderHook(() => useCartStore.getState());
      expect(result.current.getTotal()).toBe(0);
    });

    it('calcula el total correcto con un producto', () => {
      const { result } = renderHook(() => useCartStore.getState());
      act(() => {
        result.current.addProduct(mockProduct1, 2);
      });
      expect(useCartStore.getState().getTotal()).toBe(20); // 10 * 2
    });

    it('calcula el total correcto con varios productos', () => {
      const { result } = renderHook(() => useCartStore.getState());
      act(() => {
        result.current.addProduct(mockProduct1, 2);
        result.current.addProduct(mockProduct2, 1);
      });
      expect(useCartStore.getState().getTotal()).toBe(45); // 10*2 + 25*1
    });
  });

  describe('getItemCount', () => {
    it('devuelve 0 cuando el carrito está vacío', () => {
      const { result } = renderHook(() => useCartStore.getState());
      expect(result.current.getItemCount()).toBe(0);
    });

    it('devuelve la suma de cantidades de todos los ítems', () => {
      const { result } = renderHook(() => useCartStore.getState());
      act(() => {
        result.current.addProduct(mockProduct1, 2);
        result.current.addProduct(mockProduct2, 3);
      });
      expect(useCartStore.getState().getItemCount()).toBe(5);
    });
  });
});
