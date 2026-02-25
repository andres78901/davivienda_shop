/**
 * Pantalla del carrito: listar ítems, incrementar/decrementar/eliminar y total en tiempo real.
 */

import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style/CartScreen.styles';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/style/types';
import type { CartItem } from '../types/cart';
import type { TranslationKey } from '../i18n/translations';
import { useDispatch, useSelector } from 'react-redux';
import {
  incrementQuantity,
  removeProduct,
  decrementQuantity,
  selectCartItems,
  selectCartTotal,
} from '../store/cartSlice';
import { useThemeColors } from '../hooks/useThemeColors';
import { useTranslation } from '../hooks/useTranslation';

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

function CartRow({
  item,
  primary,
  t,
}: {
  item: CartItem;
  primary: string;
  t: (key: TranslationKey) => string;
}) {
  const dispatch = useDispatch();
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
            style={[styles.quantityBtn, { backgroundColor: primary }]}
            onPress={() => dispatch(decrementQuantity(productId))}
            accessibilityLabel={t('decreaseQty')}
          >
            <Text style={styles.quantityBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            style={[styles.quantityBtn, { backgroundColor: primary }]}
            onPress={() => dispatch(incrementQuantity(productId))}
            accessibilityLabel={t('increaseQty')}
          >
            <Text style={styles.quantityBtnText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => dispatch(removeProduct(productId))}
            accessibilityLabel={t('removeFromCart')}
          >
            <Text style={styles.removeBtnText}>{t('remove')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export function CartScreen(_props: Props) {
  const { primary } = useThemeColors();
  const { t } = useTranslation();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>{t('cartEmpty')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.product.id)}
        renderItem={({ item }) => <CartRow item={item} primary={primary} t={t} />}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.footer}>
        <Text style={styles.totalLabel}>{t('total')}</Text>
        <Text style={[styles.totalValue, { color: primary }]}>${total.toFixed(2)}</Text>
      </View>
    </View>
  );
}
