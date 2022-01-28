export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.spec.(ts|tsx)'],
  moduleNameMapper: {
    '@Libs/(.*)': '<rootDir>/libs/$1',
    '@Constants/Types': '<rootDir>/libs/constants/types/',
    '@SH/Entities/(.*)': '<rootDir>/apps/server-hire/src/entities/$1',
    '@SH/Initializations/(.*)': '<rootDir>/apps/server-hire/src/initialzations/$1',
  },
};
