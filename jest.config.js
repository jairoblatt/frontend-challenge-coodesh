module.exports = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^~/(.*)$": "<rootDir>/$1",
    "^vue$": "vue/dist/vue.common.js",
  },
  moduleFileExtensions: ["ts", "js", "vue", "json"],
  modulePathIgnorePatterns: ["cypress"],
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.js$": "babel-jest",
    ".*\\.(vue)$": "vue-jest",
    ".+\\.(css|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
  },
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/components/**/*.vue", "<rootDir>/pages/**/*.vue"],
  testEnvironment: "jsdom",
};
