module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'linebreak-style': ['error', 'unix'],
    'react/prop-types': 1,
    'react/jsx-max-props-per-line': ['error', { maximum: 10 }],
    'prettier/prettier': ['error'],
    'no-unused-vars': 1,
    'react/jsx-uses-vars': 2,
  },
  plugins: ['prettier'],
  env: {
    es6: true,
    browser: true,
    node: true,
  },
};
