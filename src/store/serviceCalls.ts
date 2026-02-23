/**
 * Capa única de acceso a servicios desde Redux.
 * Todo el I/O externo (API, storage) debe pasar por aquí; los thunks usan solo estas funciones.
 * Así Redux queda como capa global ante los servicios.
 */

import * as authApi from '../services/authApi';
import * as api from '../services/api';
import * as authStorage from './authStorage';
import * as cartStorage from '../services/cartStorage';
import type { CartItem } from '../types/cart';

/** Re-export para que los thunks no importen desde services. */
export { ApiError } from '../services/api';

// --- Auth (DummyJSON + AsyncStorage)
export const auth = {
  login: authApi.login,
  addUser: authApi.addUser,
  setStoredAuth: authStorage.setStoredAuth,
  getStoredAuth: authStorage.getStoredAuth,
  clearStoredAuth: authStorage.clearStoredAuth,
};

// --- Productos (DummyJSON)
export const products = {
  fetchProducts: api.fetchProducts,
  searchProducts: api.searchProducts,
};

// --- Carrito (AsyncStorage por usuario)
export async function loadCartForUser(
  userId: string | number
): Promise<CartItem[]> {
  return cartStorage.loadCartForUser(userId);
}

export async function saveCartForUser(
  userId: string | number,
  items: CartItem[]
): Promise<void> {
  return cartStorage.saveCartForUser(userId, items);
}
