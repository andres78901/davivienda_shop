/**
 * Pantalla principal: lista de productos desde Redux (fetchProductsThunk, searchProductsThunk).
 */

import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './style/HomeScreen.styles';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/style/types';
import type { Product } from '../types/product';
import { fetchProductsThunk, searchProductsThunk } from '../store/productsSlice';
import { selectProducts, selectProductsLoading, selectProductsError } from '../store/productsSlice';
import type { AppDispatch, RootState } from '../store';
import { useThemeColors } from '../hooks/useThemeColors';
import { useTranslation } from '../hooks/useTranslation';
import { ProductCard } from '../components/ProductCard';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const keyExtractor = (item: Product) => String(item.id);

export function HomeScreen({ navigation }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { primary } = useThemeColors();
  const { t } = useTranslation();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  const handleRetry = useCallback(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  const handleSearch = useCallback(() => {
    const q = searchQuery.trim();
    if (q) {
      dispatch(searchProductsThunk(q));
    } else {
      dispatch(fetchProductsThunk());
    }
  }, [dispatch, searchQuery]);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  /** Solo limpia el texto del input y recarga todos los productos. */
  const handleClearInput = useCallback(() => {
    setSearchQuery('');
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  const renderItem: ListRenderItem<Product> = useCallback(
    ({ item }) => (
      <ProductCard
        product={item}
        onPress={() => navigation.navigate('ProductDetail', { product: item })}
      />
    ),
    [navigation]
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>{t('loadingProducts')}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={[styles.retryButton, { backgroundColor: primary }]} onPress={handleRetry}>
          <Text style={styles.retryButtonText}>{t('retry')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchRow}>
        <View style={styles.searchInputWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder={t('searchPlaceholder')}
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            editable={!loading}
            accessibilityLabel={t('searchProducts')}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearInput}
              accessibilityLabel={t('clearSearch')}
              accessibilityRole="button"
            >
              <Text style={styles.clearButtonText}>×</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={[styles.searchButton, { backgroundColor: primary }]}
          onPress={handleSearch}
          disabled={loading}
        >
          <Text style={styles.searchButtonText}>{t('search')}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={
          !loading && products.length === 0 ? (
            <View style={styles.center}>
              <Text style={styles.errorText}>
                {t('noResults')}
              </Text>
              <TouchableOpacity style={[styles.retryButton, { backgroundColor: primary }]} onPress={handleClearSearch}>
                <Text style={styles.retryButtonText}>{t('viewAll')}</Text>
              </TouchableOpacity>
            </View>
          ) : null
        }
      />
    </View>
  );
}
