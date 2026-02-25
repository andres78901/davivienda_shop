/**
 * Menú hamburguesa del header: Carrito, Mis datos, Tema, Cambio de idioma y Salir.
 */

import React, { useState } from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { clearStoredAuth } from '../store/authStorage';
import { useTranslation } from '../hooks/useTranslation';
import { styles } from './style/HamburgerMenu.styles';

export function HamburgerMenu() {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

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

  const goToChangeLanguage = () => {
    closeMenu();
    navigation.navigate('changeLanguage');
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
        accessibilityLabel={t('openMenu')}
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
              <Text style={styles.menuTitle}>{t('menu')}</Text>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={goToCart}
                accessibilityLabel={t('cart')}
              >
                <Text style={styles.menuItemIcon}>🛒</Text>
                <Text style={styles.menuItemText}>{t('cart')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={goToProfile}
                accessibilityLabel={t('profile')}
              >
                <Text style={styles.menuItemIcon}>👤</Text>
                <Text style={styles.menuItemText}>{t('profile')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={goToTheme}
                accessibilityLabel={t('theme')}
              >
                <Text style={styles.menuItemIcon}>🎨</Text>
                <Text style={styles.menuItemText}>{t('theme')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={goToChangeLanguage}
                accessibilityLabel={t('changeLanguage')}
              >
                <Text style={styles.menuItemIcon}>🌐</Text>
                <Text style={styles.menuItemText}>{t('changeLanguage')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.menuItem, styles.menuItemLast]}
                onPress={handleLogout}
                accessibilityLabel={t('logout')}
              >
                <Text style={styles.menuItemIcon}>🚪</Text>
                <Text style={[styles.menuItemText, styles.menuItemTextDanger]}>
                  {t('logout')}
                </Text>
              </TouchableOpacity>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
