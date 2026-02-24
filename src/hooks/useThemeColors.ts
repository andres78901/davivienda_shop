/**
 * Hook que devuelve los colores del tema seleccionado (Redux).
 */

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getThemeColors } from '../theme/colors';
import { selectThemeId } from '../store/themeSlice';

export function useThemeColors() {
  const themeId = useSelector(selectThemeId);
  return useMemo(() => getThemeColors(themeId), [themeId]);
}
