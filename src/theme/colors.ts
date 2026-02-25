/**
 * Tema de colores de la app.
 * Incluye tema por defecto y paletas seleccionables (imágenes del menú).
 */

export const palette = {
  dark: '#012340',
  forest: '#025939',
  emerald: '#027333',
  leaf: '#03A63C',
  lime: '#04D939',
} as const;

/** Ids de temas seleccionables en la pantalla de tema */
export const THEME_IDS = [
  'default',
  'palette1',
  'palette2',
  'palette3',
  'palette4',
  'palette5',
  'palette6',
  'palette7',
  'palette8',
  'palette9',
  'palette10',
] as const;
export type ThemeId = (typeof THEME_IDS)[number];

export interface ThemeColors {
  primary: string;
  accent: string;
  header: { background: string; tint: string };
  /** Colores de la paleta para mostrar en el selector (5 por tema) */
  swatches: readonly [string, string, string, string, string];
  label: string;
}

/** Tema por defecto: verdes (bosque, esmeralda, lima) */
const defaultTheme: ThemeColors = {
  primary: palette.emerald,
  accent: palette.lime,
  header: { background: palette.dark, tint: '#fff' },
  swatches: [palette.dark, palette.forest, palette.emerald, palette.leaf, palette.lime],
  label: 'Por defecto',
};

const palette1Theme: ThemeColors = {
  primary: '#0A7373',
  accent: '#EDAA25',
  header: { background: '#010221', tint: '#fff' },
  swatches: ['#010221', '#0A7373', '#B7BF99', '#EDAA25', '#C43302'],
  label: 'Paleta 1',
};

const palette2Theme: ThemeColors = {
  primary: '#812B8C',
  accent: '#D9731A',
  header: { background: '#2A2359', tint: '#fff' },
  swatches: ['#BF247A', '#812B8C', '#2A2359', '#D9731A', '#BF3939'],
  label: 'Paleta 2',
};

const palette3Theme: ThemeColors = {
  primary: '#F2A516',
  accent: '#38D0F2',
  header: { background: '#1B8EF2', tint: '#fff' },
  swatches: ['#1B8EF2', '#1BA0F2', '#38BDF2', '#38D0F2', '#F2A516'],
  label: 'Paleta 3',
};

const palette4Theme: ThemeColors = {
  primary: '#BBDDF2',
  accent: '#6DBFF2',
  header: { background: '#B78DF2', tint: '#fff' },
  swatches: ['#EFD5F2', '#D2A2F2', '#B78DF2', '#6DBFF2', '#BBDDF2'],
  label: 'Paleta 4',
};

const palette5Theme: ThemeColors = {
  primary: '#BF8339',
  accent: '#8C5B30',
  header: { background: '#593528', tint: '#fff' },
  swatches: ['#A69E8F', '#BF8339', '#8C5B30', '#73462C', '#593528'],
  label: 'Paleta 5',
};

const palette6Theme: ThemeColors = {
  primary: '#034C8C',
  accent: '#BF9004',
  header: { background: '#730237', tint: '#fff' },
  swatches: ['#A60321', '#730237', '#034C8C', '#BF9004', '#8C4E03'],
  label: 'Paleta 6',
};

const palette7Theme: ThemeColors = {
  primary: '#049DBF',
  accent: '#04C4D9',
  header: { background: '#012E40', tint: '#fff' },
  swatches: ['#0378A6', '#025373', '#012E40', '#049DBF', '#04C4D9'],
  label: 'Paleta 7',
};

const palette8Theme: ThemeColors = {
  primary: '#F2B807',
  accent: '#F27A5E',
  header: { background: '#F21365', tint: '#fff' },
  swatches: ['#F21365', '#63A5BF', '#F2B807', '#F2AE2E', '#F27A5E'],
  label: 'Paleta 8',
};

const palette9Theme: ThemeColors = {
  primary: '#40A819',
  accent: '#45FF00',
  header: { background: '#40A819', tint: '#fff' },
  swatches: ['#6BB251', '#40A819', '#45FF00', '#B2009E', '#FF00E2'],
  label: 'Paleta 9',
};

const palette10Theme: ThemeColors = {
  primary: '#15AEBF',
  accent: '#F2913D',
  header: { background: '#8C0F61', tint: '#fff' },
  swatches: ['#D90B56', '#8C0F61', '#15AEBF', '#F2913D', '#F24130'],
  label: 'Paleta 10',
};

const themes: Record<ThemeId, ThemeColors> = {
  default: defaultTheme,
  palette1: palette1Theme,
  palette2: palette2Theme,
  palette3: palette3Theme,
  palette4: palette4Theme,
  palette5: palette5Theme,
  palette6: palette6Theme,
  palette7: palette7Theme,
  palette8: palette8Theme,
  palette9: palette9Theme,
  palette10: palette10Theme,
};

export function getThemeColors(themeId: ThemeId): ThemeColors {
  return themes[themeId] ?? defaultTheme;
}

/** Valores estáticos para compatibilidad; usar getThemeColors(themeId) o useThemeColors() en UI. */
export const primary = defaultTheme.primary;
export const accent = defaultTheme.accent;
export const header = defaultTheme.header;
export const theme = {
  palette,
  primary,
  accent,
  header,
} as const;
