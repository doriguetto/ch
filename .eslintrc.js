module.exports = {
  root: true,
  extends: [
    // 'airbnb-base',
    'plugin:json/recommended',
    'plugin:xwalk/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // enable JSX parsing
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    'no-param-reassign': [2, { props: false }],
  },
  settings: {
    react: {
      version: 'detect', // ✅ detects your installed React version
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.tsx'],
      },
    },
  },
};
