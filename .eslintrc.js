module.exports = {
  parser: `@typescript-eslint/parser`,
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint"
  ],
  plugins: ["@typescript-eslint", "prettier"],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    trailingComma: "all",
    tabWidth: 4,
    quotes: "off",
    "@typescript-eslint/quotes": [
      2,
      "backtick",
      {
        "avoidEscape": true
      }
    ],
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    indent: [
      "error",
      4,
      {
        ignoreComments: true,
        SwitchCase: 2,
      }
    ],
    "prettier/prettier": [
      "error",
      {
        trailingComma: "all",
        semi: true,
        singleQuote: false,
        printWidth: 120,
        tabWidth: 4,
      }
    ],
  }
}
