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

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

export function ProductDetailScreen({ route }: Props) {
  const { product } = route.params;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addProduct({ product, quantity: 1 }));
    showToast('Agregado al carrito');
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
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Text style={styles.rating}>⭐ {product.rating}</Text>
          <Text style={styles.stock}>Stock: {product.stock}</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddToCart}
          accessibilityRole="button"
          accessibilityLabel="Agregar al carrito"
        >
          <Text style={styles.addButtonText}>Agregar al carrito</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
