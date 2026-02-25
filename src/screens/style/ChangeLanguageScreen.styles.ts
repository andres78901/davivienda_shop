import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 32,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  hint: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
  },
  optionText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#333',
  },
  checkmark: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: '700',
  },
});
