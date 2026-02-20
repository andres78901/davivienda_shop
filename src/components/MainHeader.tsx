/**
 * Header principal: hamburguesa, título y carrito (sin cambios).
 * Debajo, nueva línea con el usuario autenticado (desde Redux/AsyncStorage).
 */

import React from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { HamburgerMenu } from './HamburgerMenu.tsx';
import { HeaderCartButton } from './HeaderCartButton.tsx';
import { styles } from './style/MainHeader.styles';

type MainHeaderProps = {
  title: string;
  onCartPress: () => void;
};

export function MainHeader({ title, onCartPress }: MainHeaderProps) {
  const insets = useSafeAreaInsets();
  const user = useSelector((s: RootState) => s.auth.user);
  const username = user?.username ?? '';

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 8) }]}>
      <View style={styles.row}>
        <HamburgerMenu />
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <HeaderCartButton onPress={onCartPress} />
      </View>
      {username ? (
        <>
          <View style={styles.lineBreak} />
          <Text style={styles.userLine} numberOfLines={1}>
            Conectado como: <Text style={styles.textUserAuth}>{username}</Text>
          </Text>
        </>
      ) : null}
    </View>
  );
}
