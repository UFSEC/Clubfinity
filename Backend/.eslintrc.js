module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: [
    '@typescript-eslint',
    'jest',
    'chai-friendly',
  ],
  rules: {
    'no-underscore-dangle': 'off',
    'no-unused-expressions': 0,
    'no-return-await': 0,
    'chai-friendly/no-unused-expressions': 2,
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['Seed/seed.js', '**/*.spec.js'] }],
  },
};
