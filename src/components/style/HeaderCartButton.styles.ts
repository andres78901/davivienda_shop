import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cartButton: {
    marginRight: 12,
    padding: 8,
    position: 'relative',
  },
  cartIcon: {
    fontSize: 24,
    color: '#fff',
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ff4444',
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
});
