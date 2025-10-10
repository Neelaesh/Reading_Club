module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[t]sx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testEnvironment: "jsdom",
  /* moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/fonts/__mock__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/src/fonts/__mock__/styleMock.js",
  }, */
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coveragePathIgnorePatterns: [
    "/build/",
    "/node_modules/",
  ],
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
