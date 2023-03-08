module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    // REACT TESTING LIBRARY LINTER: https://github.com/testing-library/eslint-plugin-testing-library
    'plugin:testing-library/react',
    // JEST DOM LINTER: https://github.com/testing-library/eslint-plugin-jest-dom
    'plugin:jest-dom/recommended',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'testing-library',
    'jest-dom',
  ],
  rules: {
    // allow .js .jsx for file imports
    'import/extensions': 'off',

    // allow props-types to not be defined
    'react/prop-types': 'off',

    // allow global variables, specifically for event
    'no-restricted-globals': 'off', // consider turning on

    // allow arrow functions
    'arrow-body-style': 'off',

    // allow react component as return for function
    'react/function-component-definition': 'off', // consider turning on

    // related to button click on non-button html element
    'jsx-a11y/anchor-is-valid': 'off',

    // allow console.log and console.error
    'no-console': 'off',
  },
};
