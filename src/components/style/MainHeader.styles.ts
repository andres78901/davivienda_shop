import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0066cc',
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginHorizontal: 8,
  },
  lineBreak: {
    height: 8,
  },
  userLine: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
  },
  textUserAuth: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
});
