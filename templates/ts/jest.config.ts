// jest.config.ts
import type { InitialOptionsTsJest } from "ts-jest";

const config: InitialOptionsTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  bail: true,
  roots: ["<rootDir>/src/", "<rootDir>/__tests__/"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  collectCoverageFrom: ["<rootDir>/src/**"],
  // moduleNameMapper: pathsToModuleNameMapper(
  //   tsconfig.compilerOptions.paths /*, { prefix: '<rootDir>/' } */
  // ),

  globals: {
    "ts-jest": {
      // ts-jest configuration goes here
      tsconfig: "./tsconfig.json",
    },
  },
};
export default config;
