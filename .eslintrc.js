module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    "no-console": "warn",
    // "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "max-len": ["error", { code: 120 }],
    complexity: ["warn", 10],
    "no-unused-vars": "error",
  },
  env: {
    node: true,
    es2021: true,
  },
};
