/**
 * Thunks de Redux para carrito: carga y persistencia por usuario.
 * Usan solo la capa global de servicios (serviceCalls).
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import type { CartItem } from '../types/cart';
import { loadCartForUser as loadCartService, saveCartForUser as saveCartService } from './serviceCalls';
import { setItems } from './cartSlice';

/** Carga el carrito del usuario desde storage y actualiza el estado. */
export const loadCartThunk = createAsyncThunk(
  'cart/load',
  async (userId: string | number, { dispatch }) => {
    const items = await loadCartService(userId);
    dispatch(setItems(items));
    return items;
  }
);

/** Persiste el carrito del usuario en storage (fire-and-forget). */
export const saveCartThunk = createAsyncThunk(
  'cart/save',
  async (
    { userId, items }: { userId: string | number; items: CartItem[] }
  ) => {
    await saveCartService(userId, items);
  }
);
