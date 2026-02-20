/**
 * Sincroniza el carrito de Zustand con la base de datos local por usuario.
 * Carga el carrito al cambiar de usuario y persiste en cada cambio.
 */

import { useEffect } from 'react';
import { useCartStore } from '../store/cartStore';
import { loadCartForUser, saveCartForUser } from '../services/cartStorage';

const GUEST_ID = 'guest';

/**
 * Carga el carrito del usuario actual y persiste los cambios en AsyncStorage.
 * Debe usarse dentro del flujo autenticado (userId numérico) o con 'guest'.
 */
export function useCartSync(userId: number | undefined | null): void {
  const setItems = useCartStore((s) => s.setItems);
  const currentUserId = userId ?? GUEST_ID;

  // Cargar carrito al montar o al cambiar de usuario
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const items = await loadCartForUser(currentUserId);
        if (!cancelled) setItems(items);
      } catch {
        if (!cancelled) setItems([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [currentUserId, setItems]);

  // Persistir al cambiar los ítems del carrito
  useEffect(() => {
    const unsubscribe = useCartStore.subscribe(() => {
      const items = useCartStore.getState().items;
      saveCartForUser(currentUserId, items);
    });
    return unsubscribe;
  }, [currentUserId]);
}
