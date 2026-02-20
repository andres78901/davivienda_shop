/**
 * Navegación raíz: muestra Auth (Login/Register) o Main (Home/Carrito) según Redux auth.
 */

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getStoredAuth } from '../store/authStorage';
import { setCredentials } from '../store/authSlice';
import type { RootState } from '../store';
import { AuthNavigator } from './AuthNavigator';
import { AppNavigator } from './AppNavigator';
import { styles } from './style/RootNavigator.styles';

export function RootNavigator() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((s: RootState) => s.auth.isAuthenticated);
  const [isRestoring, setIsRestoring] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { accessToken, user } = await getStoredAuth();
        if (!cancelled && accessToken && user) {
          dispatch(setCredentials({ user, accessToken }));
        }
      } catch {
        // ignore
      } finally {
        if (!cancelled) setIsRestoring(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  if (isRestoring) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    );
  }

  return isAuthenticated ? <AppNavigator /> : <AuthNavigator />;
}