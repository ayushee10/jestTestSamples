module.exports = {
    testMatch: [
      '<rootDir>/*.int.test.js'
    ],
    collectCoverageFrom: [
      "service.js",
    ],
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: -10,
      },
    }
  };
  