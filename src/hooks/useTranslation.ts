/**
 * Hook para obtener la función de traducción según el idioma actual (Redux).
 */

import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import {
  getTranslation,
  type TranslationKey,
} from '../i18n/translations';

export function useTranslation(): {
  t: (key: TranslationKey) => string;
  locale: 'es' | 'en';
} {
  const localeId = useSelector((s: RootState) => s.locale.localeId);

  const t = (key: TranslationKey) => getTranslation(localeId, key);

  return { t, locale: localeId };
}
