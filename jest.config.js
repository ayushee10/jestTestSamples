module.exports = {
    testMatch: [
      '<rootDir>/*.test.js',
    ],
    testPathIgnorePatterns: [
      '<rootDir>/_integration'
    ],
    collectCoverageFrom: [
      "*.js",
      "!utils",
      "!*.config.js"
    ],
 
  };
  