module.exports = {
  root: true,
  extends: ["@react-native", "plugin:prettier/recommended"],
  settings: {
    "import/resolver": {
      "babel-plugin-root-import": {
        rootPathSuffix: "src",
      },
    },
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        singleQuote: false,
        arrowParens: "always",
        bracketSpacing: true,
      },
    ],
  },
};
