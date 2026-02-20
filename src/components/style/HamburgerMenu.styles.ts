import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  trigger: {
    marginLeft: 12,
    padding: 8,
    justifyContent: 'center',
  },
  hamburgerIcon: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-start',
    paddingTop: 56,
    paddingLeft: 12,
    alignItems: 'flex-start',
  },
  menuContainer: {
    minWidth: 220,
  },
  menu: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemIcon: {
    fontSize: 20,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  menuItemTextDanger: {
    color: '#c00',
  },
});
