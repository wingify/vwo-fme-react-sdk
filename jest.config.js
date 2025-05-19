module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    '/node_modules/(?!@testing-library|vwo-fme-node-sdk)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom'
  ],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
