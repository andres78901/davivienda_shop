/**
 * Botón del carrito para el header (ícono + badge de cantidad).
 */

import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectCartItemCount } from '../store/cartSlice';
import { useTranslation } from '../hooks/useTranslation';
import { styles } from './style/HeaderCartButton.styles';

type Props = {
  onPress: () => void;
};

export function HeaderCartButton({ onPress }: Props) {
  const itemCount = useSelector(selectCartItemCount);
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.cartButton}
      accessibilityRole="button"
      accessibilityLabel={t('goToCart')}
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
