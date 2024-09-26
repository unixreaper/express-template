module.exports = {
    testEnvironment: 'node',
    coveragePathIgnorePatterns: [
      "/node_modules/",
      "/coverage/"
    ],
    testPathIgnorePatterns: [
      "/node_modules/",
      "/coverage/"
    ],
    setupFilesAfterEnv: ['./jest.setup.js']
  };
  