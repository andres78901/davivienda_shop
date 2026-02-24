/**
 * Persistencia del tema seleccionado (AsyncStorage).
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { THEME_IDS, type ThemeId } from '../theme/colors';

const THEME_KEY = '@DaviviendaShop:themeId';

export async function getStoredThemeId(): Promise<ThemeId | null> {
  try {
    const value = await AsyncStorage.getItem(THEME_KEY);
    if (value === null) return null;
    if ((THEME_IDS as readonly string[]).includes(value)) {
      return value as ThemeId;
    }
    return null;
  } catch {
    return null;
  }
}

export async function setStoredThemeId(themeId: ThemeId): Promise<void> {
  await AsyncStorage.setItem(THEME_KEY, themeId);
}
