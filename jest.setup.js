/**
 * Setup global para Jest: mock de AsyncStorage (requerido por authStorage en App).
 */
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-native-change-icon', () => ({
  changeIcon: jest.fn(() => Promise.resolve()),
  resetIcon: jest.fn(() => Promise.resolve()),
  getIcon: jest.fn(() => Promise.resolve(null)),
}));
