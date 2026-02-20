/**
 * Bridge al módulo nativo ToastModule.
 * Android: Toast nativo.
 * iOS: Mensaje breve no invasivo (UIAlertController auto-cierre o vista equivalente).
 */

import { NativeModules } from 'react-native';

const { ToastModule: NativeToast } = NativeModules;

export interface ToastModuleSpec {
  show: (message: string) => void;
}

/**
 * Muestra un mensaje nativo en pantalla.
 * En Android: Toast. En iOS: alert breve que se auto-cierra.
 */
export function showToast(message: string): void {
  if (NativeToast && typeof NativeToast.show === 'function') {
    NativeToast.show(message);
  } else if (__DEV__) {
    // Fallback en desarrollo si el módulo no está enlazado
    console.warn('[ToastModule] No nativo disponible:', message);
  }
}

export const ToastModule: ToastModuleSpec | null =
  NativeToast && typeof NativeToast.show === 'function' ? NativeToast : null;
