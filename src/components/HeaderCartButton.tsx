/**
 * Botón del carrito para el header (ícono + badge de cantidad).
 */

import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useCartStore } from '../store/cartStore';
import { styles } from './style/HeaderCartButton.styles';

type Props = {
  onPress: () => void;
};

export function HeaderCartButton({ onPress }: Props) {
  const itemCount = useCartStore((s) => s.getItemCount());

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.cartButton}
      accessibilityRole="button"
      accessibilityLabel="Ir al carrito"
    >
      <Text style={styles.cartIcon}>🛒</Text>
      {itemCount > 0 && (
        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>{itemCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
