module.exports = {
  collectCoverageFrom: ["<rootDir>/src/**/*.ts", "!<rootDir>/src/**/*.d.ts"],
  coveragePathIgnorePatterns: ["node_modules"],
  coverageReporters: ["lcov", "html"],
  modulePathIgnorePatterns: ["<rootDir>/handlebars", "<rootDir>/templates"],
  preset: "ts-jest",
  setupFiles: ["./.jest/env.js"],
  setupFilesAfterEnv: ["./.jest/setup.js"],
  testEnvironment: "node",
  testMatch: ["**/test/**/*.test.ts"],
};
