module.exports = {
  roots: ["<rootDir>/src"],
  preset: "ts-jest",
  moduleDirectories: ["node_modules", "src"],
  transform: {
    "^.+\\.[t|j]sx?$": "ts-jest"
    //"\\.(ts|js)x?$": "ts-jest"
  },
  // transform: {
  //   "\\.tsx?$": "ts-jest",
  //   "\\.jsx?$": "babel-jest",
  // },
  // testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};
