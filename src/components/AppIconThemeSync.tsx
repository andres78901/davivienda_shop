/**
 * Sincroniza el icono de la app (launcher) con el tema seleccionado.
 * Al cambiar themeId en Redux (incl. al cargar desde storage), actualiza el icono.
 */

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectThemeId } from '../store/themeSlice';
import type { RootState } from '../store';
import { setAppIconForTheme } from '../services/appIcon';

export function AppIconThemeSync() {
  const themeId = useSelector((s: RootState) => s.theme.themeId);

  useEffect(() => {
    setAppIconForTheme(themeId);
  }, [themeId]);

  return null;
}
