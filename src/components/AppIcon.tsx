/**
 * Icono de la app que usa los colores del tema seleccionado.
 * Se muestra en header y pantalla de tema; el fondo cambia con theme.primary.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeColors } from '../hooks/useThemeColors';

type AppIconProps = {
  /** Tamaño del icono (lado del cuadrado). Default 32. */
  size?: number;
};

export function AppIcon({ size = 32 }: AppIconProps) {
  const { primary } = useThemeColors();

  return (
    <View
      style={[
        styles.wrapper,
        {
          width: size,
          height: size,
          borderRadius: size * 0.22,
          backgroundColor: primary,
        },
      ]}
      accessibilityLabel="Icono de la app"
    >
      <Text style={[styles.cart, { fontSize: size * 0.55 }]}>🛒</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cart: {
    color: '#fff',
  },
});
