/**
 * Tema de colores de la app.
 * Paleta: azul oscuro → verdes (bosque, esmeralda, hoja, lima).
 * Única fuente de verdad para estilos de header, botones y acentos.
 */

export const palette = {
  dark: '#012340',
  forest: '#025939',
  emerald: '#027333',
  leaf: '#03A63C',
  lime: '#04D939',
} as const;

export const primary = palette.emerald;
export const accent = palette.lime;
export const header = {
  background: palette.dark,
  tint: '#fff',
} as const;

export const theme = {
  palette,
  primary,
  accent,
  header,
} as const;
