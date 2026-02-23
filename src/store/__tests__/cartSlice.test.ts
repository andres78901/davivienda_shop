/**
 * Tests unitarios del slice Redux del carrito: agregar, eliminar, incrementar, decrementar y selectores.
 */

import { configureStore } from '@reduxjs/toolkit';
import {
  cartReducer,
  setItems,
  addProduct,
  removeProduct,
  incrementQuantity,
  decrementQuantity,
  selectCartItems,
  selectCartTotal,
  selectCartItemCount,
} from '../cartSlice';
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

function createStore() {
  return configureStore({ reducer: { cart: cartReducer } });
}

describe('cartSlice', () => {
  describe('addProduct', () => {
    it('agrega un producto nuevo al carrito', () => {
      const store = createStore();
      store.dispatch(addProduct({ product: mockProduct1 }));
      const items = selectCartItems(store.getState());
      expect(items).toHaveLength(1);
      expect(items[0].product.id).toBe(1);
      expect(items[0].quantity).toBe(1);
    });

    it('incrementa cantidad si el producto ya está en el carrito', () => {
      const store = createStore();
      store.dispatch(addProduct({ product: mockProduct1 }));
      store.dispatch(addProduct({ product: mockProduct1, quantity: 2 }));
      const items = selectCartItems(store.getState());
      expect(items).toHaveLength(1);
      expect(items[0].quantity).toBe(3);
    });
  });

  describe('removeProduct', () => {
    it('elimina el producto del carrito', () => {
      const store = createStore();
      store.dispatch(addProduct({ product: mockProduct1 }));
      store.dispatch(removeProduct(mockProduct1.id));
      expect(selectCartItems(store.getState())).toHaveLength(0);
    });

    it('no hace nada si el producto no está en el carrito', () => {
      const store = createStore();
      store.dispatch(addProduct({ product: mockProduct1 }));
      store.dispatch(removeProduct(999));
      expect(selectCartItems(store.getState())).toHaveLength(1);
    });
  });

  describe('incrementQuantity', () => {
    it('aumenta la cantidad del producto', () => {
      const store = createStore();
      store.dispatch(addProduct({ product: mockProduct1 }));
      store.dispatch(incrementQuantity(mockProduct1.id));
      const items = selectCartItems(store.getState());
      expect(items[0].quantity).toBe(2);
    });
  });

  describe('decrementQuantity', () => {
    it('disminuye la cantidad y elimina el ítem si llega a 0', () => {
      const store = createStore();
      store.dispatch(addProduct({ product: mockProduct1 }));
      store.dispatch(decrementQuantity(mockProduct1.id));
      expect(selectCartItems(store.getState())).toHaveLength(0);
    });

    it('no hace nada si el producto no está en el carrito', () => {
      const store = createStore();
      store.dispatch(addProduct({ product: mockProduct1 }));
      store.dispatch(decrementQuantity(999));
      const items = selectCartItems(store.getState());
      expect(items).toHaveLength(1);
      expect(items[0].quantity).toBe(1);
    });

    it('disminuye la cantidad sin eliminar si es mayor que 1', () => {
      const store = createStore();
      store.dispatch(addProduct({ product: mockProduct1, quantity: 3 }));
      store.dispatch(decrementQuantity(mockProduct1.id));
      const items = selectCartItems(store.getState());
      expect(items[0].quantity).toBe(2);
    });
  });

  describe('setItems', () => {
    it('reemplaza los ítems del carrito', () => {
      const store = createStore();
      store.dispatch(addProduct({ product: mockProduct1 }));
      store.dispatch(setItems([{ product: mockProduct2, quantity: 2 }]));
      const items = selectCartItems(store.getState());
      expect(items).toHaveLength(1);
      expect(items[0].product.id).toBe(2);
      expect(items[0].quantity).toBe(2);
    });
  });

  describe('selectCartTotal', () => {
    it('devuelve 0 cuando el carrito está vacío', () => {
      const store = createStore();
      expect(selectCartTotal(store.getState())).toBe(0);
    });

    it('calcula el total correcto con un producto', () => {
      const store = createStore();
      store.dispatch(addProduct({ product: mockProduct1, quantity: 2 }));
      expect(selectCartTotal(store.getState())).toBe(20); // 10 * 2
    });

    it('calcula el total correcto con varios productos', () => {
      const store = createStore();
      store.dispatch(addProduct({ product: mockProduct1, quantity: 2 }));
      store.dispatch(addProduct({ product: mockProduct2, quantity: 1 }));
      expect(selectCartTotal(store.getState())).toBe(45); // 10*2 + 25*1
    });
  });

  describe('selectCartItemCount', () => {
    it('devuelve 0 cuando el carrito está vacío', () => {
      const store = createStore();
      expect(selectCartItemCount(store.getState())).toBe(0);
    });

    it('devuelve la suma de cantidades de todos los ítems', () => {
      const store = createStore();
      store.dispatch(addProduct({ product: mockProduct1, quantity: 2 }));
      store.dispatch(addProduct({ product: mockProduct2, quantity: 3 }));
      expect(selectCartItemCount(store.getState())).toBe(5);
    });
  });
});
