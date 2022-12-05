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
    // allow .jsx .jsx for file imports
    'import/extensions': 'off',
    // allow props
    'react/prop-types': 'off',
    // allow global variables, specifically for event
    'no-restricted-globals': 'off',
    // allow arrow functions
    'arrow-body-style': 'off',
    // allow react compnent as return for function
    'react/function-component-definition': 'off',
  },
};
