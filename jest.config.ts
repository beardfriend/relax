export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.spec.(ts|tsx)'],
  moduleNameMapper: {
    '@Libs/(.*)': '<rootDir>/libs/$1',
    '@SH/Initializations/(.*)': '<rootDir>/apps/server-hire/src/initialzations/$1',
  },
};
