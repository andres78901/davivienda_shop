/**
 * Sincroniza el carrito de Redux con la base de datos local por usuario.
 * Usa solo thunks (loadCartThunk, saveCartThunk); todo el I/O pasa por Redux.
 */

import { useEffect, useRef } from 'react';
import { useDispatch, useStore } from 'react-redux';
import type { RootState } from '../store';
import { loadCartThunk, saveCartThunk } from '../store/cartThunks';
import { selectCartItems } from '../store/cartSlice';

const GUEST_ID = 'guest';

/**
 * Carga el carrito del usuario actual y persiste los cambios vía Redux (serviceCalls).
 * Debe usarse dentro del flujo autenticado (userId numérico) o con 'guest'.
 */
export function useCartSync(userId: number | undefined | null): void {
  const dispatch = useDispatch();
  const store = useStore<RootState>();
  const currentUserId = userId ?? GUEST_ID;
  const prevItemsRef = useRef<ReturnType<typeof selectCartItems>>([]);

  // Cargar carrito al montar o al cambiar de usuario (solo Redux)
  useEffect(() => {
    dispatch(loadCartThunk(currentUserId));
  }, [currentUserId, dispatch]);

  // Persistir al cambiar los ítems del carrito (solo Redux)
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const items = selectCartItems(store.getState());
      if (items !== prevItemsRef.current) {
        prevItemsRef.current = items;
        void dispatch(saveCartThunk({ userId: currentUserId, items }));
      }
    });
    return unsubscribe;
  }, [currentUserId, dispatch, store]);
}
