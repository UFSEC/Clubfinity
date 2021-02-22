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
    'max-len': ['error', { code: 117 }],
    'no-underscore-dangle': ['off'],
    'no-nested-ternary': ['off'],
    'react/jsx-filename-extension': ['off'],
    'react/prefer-stateless-function': ['off'],
    'no-return-assign': ['off'],
    'react/forbid-prop-types': ['error', { forbid: ['any', 'object'] }],
    'react/prop-types': ['error', { ignore: ['navigation'] }],
    'react/static-property-placement': ['error', 'static public field'],
  },
};
