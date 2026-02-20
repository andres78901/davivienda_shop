module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest.setup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  modulePathIgnorePatterns: ['<rootDir>/node_modules'],
  collectCoverageFrom: [
    'src/store/**/*.ts',
    'src/types/**/*.ts',
    'src/services/**/*.ts',
    'src/components/**/*.tsx',
    'src/screens/**/*.tsx',
  ],
  coveragePathIgnorePatterns: ['/__tests__/', '\\.test\\.', '\\.spec\\.'],
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 20,
      lines: 20,
      statements: 20,
    },
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-screens|react-native-safe-area-context|react-redux|@reduxjs/toolkit|immer)/)',
  ],
};
