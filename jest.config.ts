import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: [
    '<rootDir>/src/__tests__/**/*.test.tsx',
    '<rootDir>/src/__tests__/**/*.test.ts',
  ],
};

export default async () => {
  const nextJestConfig = await createJestConfig(config)();
  return {
    ...nextJestConfig,
    // lucide-react ships ESM-only — next/jest's default transformIgnorePatterns
    // excludes all of node_modules and computes that array itself, overriding
    // a plain object key here, so it has to be patched onto the resolved config.
    transformIgnorePatterns: ['/node_modules/(?!(lucide-react)/)'],
  };
};
