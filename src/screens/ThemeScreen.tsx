/**
 * Pantalla de selección de tema de visualización.
 * Muestra el tema actual por defecto y las 3 paletas de las imágenes.
 */

import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, selectThemeId } from '../store/themeSlice';
import { THEME_IDS, getThemeColors } from '../theme/colors';
import { useTranslation } from '../hooks/useTranslation';
import { getThemeLabelKey } from '../i18n/translations';
import { styles } from './style/ThemeScreen.styles';

export function ThemeScreen() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentId = useSelector(selectThemeId);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t('themeTitle')}</Text>
      <Text style={styles.subtitle}>{t('themeSubtitle')}</Text>
      {THEME_IDS.map((themeId) => {
        const theme = getThemeColors(themeId);
        const isSelected = currentId === themeId;
        const themeLabel = t(getThemeLabelKey(themeId));
        return (
          <TouchableOpacity
            key={themeId}
            style={[styles.card, isSelected && styles.cardSelected]}
            onPress={() => dispatch(setTheme(themeId))}
            accessibilityLabel={`${t('themeLabel')} ${themeLabel}`}
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
              {themeLabel}
              {isSelected ? ' ✓' : ''}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
