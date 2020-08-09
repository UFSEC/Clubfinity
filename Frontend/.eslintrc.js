module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  parser: 'babel-eslint',
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-native',
  ],
  rules: {
    'max-len': ['error', { code: 115 }],
    'no-underscore-dangle': 0,
    'no-nested-ternary': 0,
    'react/jsx-filename-extension': 0,
    'react/prefer-stateless-function': 0,
    'react/forbid-prop-types': ['error', { forbid: ['any', 'object'] }],
    'react/prop-types': ['error', { ignore: ['navigation'] }],
    'react/static-property-placement': ['error', 'static public field'],
  },
};
