/**
 * Pantalla de selección de tema de visualización.
 * Muestra el tema actual por defecto y las 3 paletas de las imágenes.
 */

import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, selectThemeId } from '../store/themeSlice';
import { THEME_IDS, getThemeColors } from '../theme/colors';
import { AppIcon } from '../components/AppIcon';
import { styles } from './style/ThemeScreen.styles';

export function ThemeScreen() {
  const dispatch = useDispatch();
  const currentId = useSelector(selectThemeId);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.iconRow}>
        <AppIcon size={56} />
      </View>
      <Text style={styles.title}>Tema de visualización</Text>
      <Text style={styles.subtitle}>Selecciona una paleta de colores</Text>
      {THEME_IDS.map((themeId) => {
        const theme = getThemeColors(themeId);
        const isSelected = currentId === themeId;
        return (
          <TouchableOpacity
            key={themeId}
            style={[styles.card, isSelected && styles.cardSelected]}
            onPress={() => dispatch(setTheme(themeId))}
            accessibilityLabel={`Tema ${theme.label}`}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
          >
            <View style={styles.swatches}>
              {theme.swatches.map((color, i) => (
                <View
                  key={`${themeId}-${i}`}
                  style={[styles.swatch, { backgroundColor: color }]}
                />
              ))}
            </View>
            <Text style={styles.label}>
              {theme.label}
              {isSelected ? ' ✓' : ''}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
