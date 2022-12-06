module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "./src/utils/Controller/**/*.js, ./src/utils/Interactor/**/*.js",
  ],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setUpFilesAfterEnv: ["src/jest.setup.js"],
  moduleNameMapper: {
    axios: "axios/dist/node/axios.cjs",
    "\\.(css|sass|png)$": "<rootDir>/src/mock/fileMock.js",
  },
  transform: {
    "\\.js$": "<rootDir>/node_modules/babel-jest",
  },
};