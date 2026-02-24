/**
 * Tarjeta de producto para la lista (Home).
 */

import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import type { Product } from '../types/product';
import { useThemeColors } from '../hooks/useThemeColors';
import { styles } from './style/ProductCard.styles';

type Props = {
  product: Product;
  onPress: () => void;
};

export function ProductCard({ product, onPress }: Props) {
  const { primary } = useThemeColors();
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`Ver ${product.title}`}
    >
      <Image
        source={{ uri: product.thumbnail }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={[styles.price, { color: primary }]}>${product.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}
