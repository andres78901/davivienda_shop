/**
 * Pantalla de cambio de idioma: selección entre español e inglés.
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { setLocale } from '../store/localeSlice';
import type { LocaleId } from '../store/localeStorage';
import { useTranslation } from '../hooks/useTranslation';
import { styles } from './style/ChangeLanguageScreen.styles';

export function ChangeLanguageScreen() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentLocale = useSelector((s: RootState) => s.locale.localeId);

  const selectLanguage = (localeId: LocaleId) => {
    dispatch(setLocale(localeId));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('changeLanguageTitle')}</Text>
      <Text style={styles.hint}>{t('selectLanguage')}</Text>
      <TouchableOpacity
        style={[styles.option, currentLocale === 'es' && styles.optionSelected]}
        onPress={() => selectLanguage('es')}
        accessibilityLabel={t('spanish')}
        accessibilityState={{ selected: currentLocale === 'es' }}
      >
        <Text style={styles.optionText}>{t('spanish')}</Text>
        {currentLocale === 'es' && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.option, currentLocale === 'en' && styles.optionSelected]}
        onPress={() => selectLanguage('en')}
        accessibilityLabel={t('english')}
        accessibilityState={{ selected: currentLocale === 'en' }}
      >
        <Text style={styles.optionText}>{t('english')}</Text>
        {currentLocale === 'en' && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
    </View>
  );
}
