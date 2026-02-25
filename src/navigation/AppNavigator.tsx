/**
 * Navegación principal: Stack con Home, ProductDetail, Cart, Profile.
 * Home usa MainHeader (hamburguesa, título, carrito + línea con usuario autenticado).
 * Sincroniza el carrito con la base de datos local por usuario.
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootState } from '../store';
import type { RootStackParamList } from './style/types';
import { useThemeColors } from '../hooks/useThemeColors';
import { useTranslation } from '../hooks/useTranslation';
import { useCartSync } from '../hooks/useCartSync';
import { HomeScreen } from '../screens/HomeScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { CartScreen } from '../screens/CartScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ThemeScreen } from '../screens/ThemeScreen';
import { ChangeLanguageScreen } from '../screens/ChangeLanguageScreen';
import { MainHeader } from '../components/MainHeader';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const userId = useSelector((s: RootState) => s.auth.user?.id);
  const { header: themeHeader } = useThemeColors();
  const { t } = useTranslation();
  useCartSync(userId);

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: themeHeader.background },
        headerTintColor: themeHeader.tint,
        headerTitleStyle: { fontWeight: '700', fontSize: 18 },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: ({ navigation }) => (
            <MainHeader
              title={t('products')}
              onCartPress={() => navigation.navigate('Cart')}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: t('detail') }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: t('cartTitle') }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: t('myData') }}
      />
      <Stack.Screen
        name="Theme"
        component={ThemeScreen}
        options={{ title: t('theme') }}
      />
      <Stack.Screen
        name="changeLanguage"
        component={ChangeLanguageScreen}
        options={{ title: t('changeLanguageTitle') }}
      />
    </Stack.Navigator>
  );
}
