/**
 * Tipos para React Navigation (stack).
 */

import type { Product } from '../../types/product';

/** Stack de autenticación: Login y Register */
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

/** Stack principal de la app (requiere sesión) */
export type RootStackParamList = {
  Home: undefined;
  ProductDetail: { product: Product };
  Cart: undefined;
  Profile: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
    interface AuthParamList extends AuthStackParamList {}
  }
}
