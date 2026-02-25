/**
 * Traducciones español / inglés para la app.
 */

import type { LocaleId } from '../store/localeStorage';

export const translations = {
  es: {
    menu: 'Menú',
    openMenu: 'Abrir menú',
    cart: 'Carrito',
    goToCart: 'Ir al carrito',
    profile: 'Mis datos',
    theme: 'Tema',
    logout: 'Salir',
    changeLanguage: 'Cambio de idioma',
    changeLanguageTitle: 'Cambio de idioma',
    selectLanguage: 'Elige tu idioma',
    spanish: 'Español',
    english: 'English',
    products: 'Productos',
    detail: 'Detalle',
    cartTitle: 'Carrito',
    myData: 'Mis datos',
    language: 'Idioma',
    connectedAs: 'Conectado como',
    // HomeScreen
    loadingProducts: 'Cargando productos...',
    retry: 'Reintentar',
    searchPlaceholder: 'Buscar productos (ej: phone)',
    search: 'Buscar',
    searchProducts: 'Buscar productos',
    clearSearch: 'Limpiar búsqueda',
    noResults: 'No hay resultados. Busca algo (ej: phone) o limpia para ver todos.',
    viewAll: 'Ver todos',
    // CartScreen
    cartEmpty: 'Tu carrito está vacío',
    decreaseQty: 'Disminuir cantidad',
    increaseQty: 'Aumentar cantidad',
    remove: 'Eliminar',
    removeFromCart: 'Eliminar del carrito',
    total: 'Total',
    // ProfileScreen
    noUserData: 'No hay datos de usuario disponibles.',
    personalData: 'Datos personales',
    fieldId: 'ID',
    fieldUsername: 'Usuario',
    fieldEmail: 'Correo',
    fieldFirstName: 'Nombre',
    fieldLastName: 'Apellido',
    fieldGender: 'Género',
    // ProductDetailScreen
    addToCart: 'Agregar al carrito',
    addedToCart: 'Agregado al carrito',
    stock: 'Stock',
    // ProductCard
    viewProduct: 'Ver',
    // ThemeScreen
    themeTitle: 'Tema de visualización',
    themeSubtitle: 'Selecciona una paleta de colores',
    themeLabel: 'Tema',
    // Theme labels (selector)
    defaultTheme: 'Por defecto',
    palette1: 'Paleta 1',
    palette2: 'Paleta 2',
    palette3: 'Paleta 3',
    palette4: 'Paleta 4',
    palette5: 'Paleta 5',
    palette6: 'Paleta 6',
    palette7: 'Paleta 7',
    palette8: 'Paleta 8',
    palette9: 'Paleta 9',
    palette10: 'Paleta 10',
  },
  en: {
    menu: 'Menu',
    openMenu: 'Open menu',
    cart: 'Cart',
    goToCart: 'Go to cart',
    profile: 'My data',
    theme: 'Theme',
    logout: 'Log out',
    changeLanguage: 'Language',
    changeLanguageTitle: 'Language',
    selectLanguage: 'Choose your language',
    spanish: 'Español',
    english: 'English',
    products: 'Products',
    detail: 'Detail',
    cartTitle: 'Cart',
    myData: 'My data',
    language: 'Language',
    connectedAs: 'Logged in as',
    loadingProducts: 'Loading products...',
    retry: 'Retry',
    searchPlaceholder: 'Search products (e.g. phone)',
    search: 'Search',
    searchProducts: 'Search products',
    clearSearch: 'Clear search',
    noResults: 'No results. Search for something (e.g. phone) or clear to see all.',
    viewAll: 'View all',
    cartEmpty: 'Your cart is empty',
    decreaseQty: 'Decrease quantity',
    increaseQty: 'Increase quantity',
    remove: 'Remove',
    removeFromCart: 'Remove from cart',
    total: 'Total',
    noUserData: 'No user data available.',
    personalData: 'Personal data',
    fieldId: 'ID',
    fieldUsername: 'Username',
    fieldEmail: 'Email',
    fieldFirstName: 'First name',
    fieldLastName: 'Last name',
    fieldGender: 'Gender',
    addToCart: 'Add to cart',
    addedToCart: 'Added to cart',
    stock: 'Stock',
    viewProduct: 'View',
    themeTitle: 'Display theme',
    themeSubtitle: 'Select a color palette',
    themeLabel: 'Theme',
    defaultTheme: 'Default',
    palette1: 'Palette 1',
    palette2: 'Palette 2',
    palette3: 'Palette 3',
    palette4: 'Palette 4',
    palette5: 'Palette 5',
    palette6: 'Palette 6',
    palette7: 'Palette 7',
    palette8: 'Palette 8',
    palette9: 'Palette 9',
    palette10: 'Palette 10',
  },
} as const;

export type TranslationKey = keyof (typeof translations)['es'];

export function getTranslation(
  locale: LocaleId,
  key: TranslationKey
): string {
  return translations[locale][key] ?? translations.es[key];
}

/** Clave de traducción para el nombre del tema (default -> defaultTheme, palette1 -> palette1, ...). */
export function getThemeLabelKey(
  themeId: string
): TranslationKey {
  if (themeId === 'default') return 'defaultTheme';
  if (
    [
      'palette1', 'palette2', 'palette3', 'palette4', 'palette5',
      'palette6', 'palette7', 'palette8', 'palette9', 'palette10',
    ].includes(themeId)
  ) {
    return themeId as TranslationKey;
  }
  return 'defaultTheme';
}
