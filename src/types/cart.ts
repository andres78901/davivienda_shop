/**
 * Tipos para el carrito de compras.
 */

import type { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export function cartItemSubtotal(item: CartItem): number {
  return item.product.price * item.quantity;
}
