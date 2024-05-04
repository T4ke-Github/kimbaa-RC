/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  collectCoverage: true,
  reporters: [
    "default",
    ["jest-junit", { suiteNameTemplate: "{filename}" }],
  ],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],//["**/(*.)+(test).?(m)[jt]s?(x)"],
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,js,mjs,tsx,jsx,mts}'],
  testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
  coveragePathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/", "<rootDir>/tests/"],
  // start mongo memory server
  globalSetup: "<rootDir>/testConfig/globalSetup.ts",
  // stop mongo memory server
  globalTeardown: "<rootDir>/testConfig/globalTeardown.ts",
  // connect/disconnect before/after all tests of a suite, clear database before each test
  setupFilesAfterEnv: ["<rootDir>/testConfig/setupFile.ts"]
};