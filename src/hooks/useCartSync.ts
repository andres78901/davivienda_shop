/**
 * Sincroniza el carrito de Redux con la base de datos local por usuario.
 * Carga el carrito al cambiar de usuario y persiste en cada cambio.
 */

import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import type { RootState } from '../store';
import { setItems } from '../store/cartSlice';
import { loadCartForUser, saveCartForUser } from '../services/cartStorage';
import { selectCartItems } from '../store/cartSlice';

const GUEST_ID = 'guest';

/**
 * Carga el carrito del usuario actual y persiste los cambios en AsyncStorage.
 * Debe usarse dentro del flujo autenticado (userId numérico) o con 'guest'.
 */
export function useCartSync(userId: number | undefined | null): void {
  const dispatch = useDispatch();
  const store = useStore<RootState>();
  const currentUserId = userId ?? GUEST_ID;

  // Cargar carrito al montar o al cambiar de usuario
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const items = await loadCartForUser(currentUserId);
        if (!cancelled) dispatch(setItems(items));
      } catch {
        if (!cancelled) dispatch(setItems([]));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [currentUserId, dispatch]);

  // Persistir al cambiar los ítems del carrito
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const items = selectCartItems(store.getState());
      saveCartForUser(currentUserId, items);
    });
    return unsubscribe;
  }, [currentUserId, store]);
}
