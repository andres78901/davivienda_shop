/**
 * Navegación del flujo de autenticación: Login y Register.
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AuthStackParamList } from './style/types';
import { useThemeColors } from '../hooks/useThemeColors';
import { LoginScreen } from '../screens/LoginScreen.tsx';
import { RegisterScreen } from '../screens/RegisterScreen.tsx';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  const { header: themeHeader } = useThemeColors();
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: { backgroundColor: themeHeader.background },
        headerTintColor: themeHeader.tint,
        headerTitleStyle: { fontWeight: '700', fontSize: 18 },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Iniciar sesión' }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: 'Crear cuenta' }}
      />
    </Stack.Navigator>
  );
}
