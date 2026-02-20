/**
 * Pantalla del carrito: listar ítems, incrementar/decrementar/eliminar y total en tiempo real.
 */

import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style/CartScreen.styles';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/style/types';
import type { CartItem } from '../types/cart';
import { useCartStore } from '../store/cartStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

function CartRow({ item }: { item: CartItem }) {
  const incrementQuantity = useCartStore((s) => s.incrementQuantity);
  const decrementQuantity = useCartStore((s) => s.decrementQuantity);
  const removeProduct = useCartStore((s) => s.removeProduct);
  const productId = item.product.id;

  return (
    <View style={styles.row}>
      <Image
        source={{ uri: item.product.thumbnail }}
        style={styles.thumb}
        resizeMode="cover"
      />
      <View style={styles.details}>
        <Text style={styles.rowTitle} numberOfLines={2}>
          {item.product.title}
        </Text>
        <Text style={styles.rowPrice}>
          ${item.product.price.toFixed(2)} × {item.quantity} = $
          {(item.product.price * item.quantity).toFixed(2)}
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.quantityBtn}
            onPress={() => decrementQuantity(productId)}
            accessibilityLabel="Disminuir cantidad"
          >
            <Text style={styles.quantityBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityBtn}
            onPress={() => incrementQuantity(productId)}
            accessibilityLabel="Aumentar cantidad"
          >
            <Text style={styles.quantityBtnText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => removeProduct(productId)}
            accessibilityLabel="Eliminar del carrito"
          >
            <Text style={styles.removeBtnText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export function CartScreen(_props: Props) {
  const items = useCartStore((s) => s.items);
  const getTotal = useCartStore((s) => s.getTotal);
  const total = getTotal();

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Tu carrito está vacío</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.product.id)}
        renderItem={({ item }) => <CartRow item={item} />}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.footer}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
      </View>
    </View>
  );
}
