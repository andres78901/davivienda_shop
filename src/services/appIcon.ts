/**
 * Cambio del icono de la app (launcher) según el tema seleccionado.
 * Usa react-native-change-icon; requiere configurar iconos alternativos en Android e iOS.
 */

import { changeIcon, resetIcon } from 'react-native-change-icon';
import type { ThemeId } from '../theme/colors';

/** Nombre del icono en código (debe coincidir con Android activity-alias e iOS CFBundleAlternateIcons). */
const THEME_TO_ICON_NAME: Record<ThemeId, string | null> = {
  default: null,
  palette1: 'Palette1',
  palette2: 'Palette2',
  palette3: 'Palette3',
  palette4: 'Palette4',
  palette5: 'Palette5',
  palette6: 'Palette6',
  palette7: 'Palette7',
  palette8: 'Palette8',
  palette9: 'Palette9',
  palette10: 'Palette10',
};

/**
 * Actualiza el icono de la app en el launcher según el tema.
 * Si themeId es 'default', restaura el icono por defecto.
 * No lanza: si la native no está configurada o falla, se ignora.
 */
export async function setAppIconForTheme(themeId: ThemeId): Promise<void> {
  const iconName = THEME_TO_ICON_NAME[themeId];
  try {
    if (iconName === null) {
      await resetIcon();
    } else {
      await changeIcon(iconName);
    }
  } catch {
    // Iconos alternativos no configurados o no soportados en este entorno
  }
}
