import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  cardSelected: {
    borderColor: '#027333',
  },
  swatches: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 6,
  },
  swatch: {
    flex: 1,
    height: 36,
    borderRadius: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
