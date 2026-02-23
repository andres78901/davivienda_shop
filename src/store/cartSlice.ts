/**
 * Slice Redux del carrito: ítems, agregar, eliminar, incrementar/decrementar.
 * Los datos se persisten por usuario en la base de datos local (cartStorage) vía useCartSync.
 */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../types/product';
import type { CartItem } from '../types/cart';
import { cartItemSubtotal } from '../types/cart';

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    addProduct: (
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>
    ) => {
      const { product, quantity = 1 } = action.payload;
      const existing = state.items.find((item) => item.product.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(
        (i) => i.product.id === action.payload
      );
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex(
        (i) => i.product.id === action.payload
      );
      if (index === -1) return;
      const item = state.items[index];
      if (item.quantity <= 1) {
        state.items.splice(index, 1);
      } else {
        item.quantity -= 1;
      }
    },
  },
});

export const {
  setItems,
  addProduct,
  removeProduct,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

/** Selector: ítems del carrito */
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

/** Selector: total monetario del carrito */
export function selectCartTotal(state: { cart: CartState }): number {
  return state.cart.items.reduce(
    (sum, item) => sum + cartItemSubtotal(item),
    0
  );
}

/** Selector: cantidad total de ítems (suma de cantidades) */
export function selectCartItemCount(state: { cart: CartState }): number {
  return state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
}
