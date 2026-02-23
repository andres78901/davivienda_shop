/**
 * Redux global ante los servicios.
 *
 * - Store único: auth, cart, products. Todo el estado de la app pasa por aquí.
 * - Servicios: ningún componente ni pantalla llama a servicios directamente.
 *   Todo el I/O (API, AsyncStorage) se hace desde el store vía serviceCalls.ts
 *   y thunks (authThunks, productsSlice, cartThunks).
 * - Flujo: UI → dispatch(thunk) → serviceCalls → servicios → estado actualizado.
 */

import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authSlice';
import { cartReducer } from './cartSlice';
import { productsReducer } from './productsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Re-export thunks y selectores como punto de entrada de la capa Redux
export { loginThunk, registerThunk } from './authThunks';
export { fetchProductsThunk, searchProductsThunk, selectProducts, selectProductsLoading, selectProductsError, clearProductsError } from './productsSlice';
export { loadCartThunk, saveCartThunk } from './cartThunks';
export { setItems, addProduct, removeProduct, incrementQuantity, decrementQuantity, selectCartItems, selectCartTotal, selectCartItemCount } from './cartSlice';
export { setCredentials, setLoading, setError, logout } from './authSlice';
