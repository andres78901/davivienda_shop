/**
 * Menú hamburguesa del header: opciones Carrito, Mis datos y Salir.
 */

import React, { useState } from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { clearStoredAuth } from '../store/authStorage';
import { styles } from './style/HamburgerMenu.styles';

export function HamburgerMenu() {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const goToCart = () => {
    closeMenu();
    navigation.navigate('Cart');
  };

  const goToProfile = () => {
    closeMenu();
    navigation.navigate('Profile');
  };

  const goToTheme = () => {
    closeMenu();
    navigation.navigate('Theme');
  };

  const handleLogout = async () => {
    closeMenu();
    await clearStoredAuth();
    dispatch(logout());
  };

  return (
    <>
      <TouchableOpacity
        onPress={openMenu}
        style={styles.trigger}
        accessibilityLabel="Abrir menú"
        accessibilityRole="button"
      >
        <Text style={styles.hamburgerIcon}>☰</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <Pressable style={styles.backdrop} onPress={closeMenu}>
          <View style={styles.menuContainer}>
            <Pressable style={styles.menu} onPress={(e) => e.stopPropagation()}>
              <Text style={styles.menuTitle}>Menú</Text>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={goToCart}
                accessibilityLabel="Ir al carrito"
              >
                <Text style={styles.menuItemIcon}>🛒</Text>
                <Text style={styles.menuItemText}>Carrito</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={goToProfile}
                accessibilityLabel="Ver mis datos"
              >
                <Text style={styles.menuItemIcon}>👤</Text>
                <Text style={styles.menuItemText}>Mis datos</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={goToTheme}
                accessibilityLabel="Seleccionar tema"
              >
                <Text style={styles.menuItemIcon}>🎨</Text>
                <Text style={styles.menuItemText}>Tema</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.menuItem, styles.menuItemLast]}
                onPress={handleLogout}
                accessibilityLabel="Cerrar sesión"
              >
                <Text style={styles.menuItemIcon}>🚪</Text>
                <Text style={[styles.menuItemText, styles.menuItemTextDanger]}>
                  Salir
                </Text>
              </TouchableOpacity>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
