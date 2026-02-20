/**
 * Store del carrito con Zustand.
 * Lógica de negocio: agregar, eliminar, incrementar/decrementar cantidad y total.
 */

import { create } from 'zustand';
import type { Product } from '../types/product';
import type { CartItem } from '../types/cart';
import { cartItemSubtotal } from '../types/cart';

export interface CartState {
  items: CartItem[];
  addProduct: (product: Product, quantity?: number) => void;
  removeProduct: (productId: number) => void;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addProduct: (product: Product, quantity = 1) => {
    set((state) => {
      const existing = state.items.find(
        (item) => item.product.id === product.id
      );
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return {
        items: [...state.items, { product, quantity }],
      };
    });
  },

  removeProduct: (productId: number) => {
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    }));
  },

  incrementQuantity: (productId: number) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    }));
  },

  decrementQuantity: (productId: number) => {
    set((state) => ({
      items: state.items
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0),
    }));
  },

  getTotal: () => {
    return get().items.reduce(
      (sum, item) => sum + cartItemSubtotal(item),
      0
    );
  },

  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));
