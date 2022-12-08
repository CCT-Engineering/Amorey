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
    // allow .js .jsx for file imports
    'import/extensions': 'off',

    // allow props-types to not be defined
    'react/prop-types': 'off',

    // allow global variables, specifically for event
    'no-restricted-globals': 'off', // CHAD TO UNCOMMENT BEFORE PUSHING

    // allow arrow functions
    'arrow-body-style': 'off',

    // allow react component as return for function
    'react/function-component-definition': 'off', // CHAD TO UNCOMMENT BEFORE PUSHING

    // related to button click on non-button html element
    'jsx-a11y/anchor-is-valid': 'off',
  },
};
