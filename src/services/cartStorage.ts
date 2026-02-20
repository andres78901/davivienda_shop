/**
 * Almacenamiento del carrito por usuario en la base de datos local del dispositivo (AsyncStorage).
 * Cada usuario tiene su propia clave para aislar sus ítems.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { CartItem } from '../types/cart';

const CART_KEY_PREFIX = 'daviviendashop-cart';

function getCartKey(userId: string | number): string {
  return `${CART_KEY_PREFIX}-${userId}`;
}

/**
 * Carga el carrito guardado para un usuario.
 * @param userId - Id del usuario (o 'guest' si no está autenticado)
 * @returns Lista de ítems del carrito
 */
export async function loadCartForUser(
  userId: string | number
): Promise<CartItem[]> {
  try {
    const raw = await AsyncStorage.getItem(getCartKey(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Guarda el carrito del usuario en la base de datos local.
 * @param userId - Id del usuario (o 'guest')
 * @param items - Lista de ítems a persistir
 */
export async function saveCartForUser(
  userId: string | number,
  items: CartItem[]
): Promise<void> {
  try {
    await AsyncStorage.setItem(getCartKey(userId), JSON.stringify(items));
  } catch {
    // fallback silencioso; la app sigue funcionando en memoria
  }
}
