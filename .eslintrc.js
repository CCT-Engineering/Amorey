module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'import/extensions': 'off',
    'react/prop-types': 'off',
    'no-restricted-globals': 'off',
    'arrow-body-style': 'off',
    'react/function-component-definition': 'off',
  },
};
