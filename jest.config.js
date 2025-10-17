module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[t]sx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testEnvironment: "jsdom",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coveragePathIgnorePatterns: ["/build/", "/node_modules/"],
  coverageReporters: ["lcov", "cobertura", "text", "clover"],
  reporters: [
    "default",
    [
      "jest-sonar",
      {
        outputDirectory: "report/sonar",
        outputName: "sonar-test-execution-report.xml",
        reportedFilePath: "absolute",
      },
    ],
  ],
};
