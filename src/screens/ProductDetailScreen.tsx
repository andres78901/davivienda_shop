/**
 * Pantalla de detalle del producto con botón "Agregar al carrito".
 */

import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style/ProductDetailScreen.styles';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/style/types';
import { useDispatch } from 'react-redux';
import { addProduct } from '../store/cartSlice';
import { showToast } from '../native/ToastModule';
import { useThemeColors } from '../hooks/useThemeColors';
import { useTranslation } from '../hooks/useTranslation';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

export function ProductDetailScreen({ route }: Props) {
  const { product } = route.params;
  const dispatch = useDispatch();
  const { primary } = useThemeColors();
  const { t } = useTranslation();

  const handleAddToCart = () => {
    dispatch(addProduct({ product, quantity: 1 }));
    showToast(t('addedToCart'));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={{ uri: product.images[0] ?? product.thumbnail }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.info}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.meta}>
          <Text style={[styles.price, { color: primary }]}>${product.price.toFixed(2)}</Text>
          <Text style={styles.rating}>⭐ {product.rating}</Text>
          <Text style={styles.stock}>{t('stock')}: {product.stock}</Text>
        </View>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: primary }]}
          onPress={handleAddToCart}
          accessibilityRole="button"
          accessibilityLabel={t('addToCart')}
        >
          <Text style={styles.addButtonText}>{t('addToCart')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
