/**
 * Persistencia del idioma seleccionado (AsyncStorage).
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

export type LocaleId = 'es' | 'en';

const LOCALE_KEY = '@DaviviendaShop:localeId';

const VALID_LOCALES: LocaleId[] = ['es', 'en'];

export async function getStoredLocale(): Promise<LocaleId | null> {
  try {
    const value = await AsyncStorage.getItem(LOCALE_KEY);
    if (value === null) return null;
    if (VALID_LOCALES.includes(value as LocaleId)) {
      return value as LocaleId;
    }
    return null;
  } catch {
    return null;
  }
}

export async function setStoredLocale(localeId: LocaleId): Promise<void> {
  await AsyncStorage.setItem(LOCALE_KEY, localeId);
}
