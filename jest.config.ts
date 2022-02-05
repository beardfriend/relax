export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.spec.(ts|tsx)'],
  moduleNameMapper: {
    '@Libs/(.*)': '<rootDir>/libs/$1',
    '@Constants/Types': '<rootDir>/libs/constants/types/',
    '@Constants/Messages': '<rootDir>/libs/constants/messages/',
    '@SH/Entities/(.*)': '<rootDir>/apps/server-hire/src/entities/$1',
    '@SH/Initializations/(.*)': '<rootDir>/apps/server-hire/src/initialzations/$1',
    '@SH/Controllers/(.*)': '<rootDir>/apps/server-hire/src/controllers/$1',
    '@SH/Services/(.*)': '<rootDir>/apps/server-hire/src/services/$1',
    '@SH/Routers/(.*)': '<rootDir>/apps/server-hire/src/routers/$1',
    '@SH/MiddleWares/(.*)': '<rootDir>/apps/server-hire/src/middlewares/$1',
  },
};
