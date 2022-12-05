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
    // allow props
    'react/prop-types': 'off',
    // allow global variables, specifically for event
    'no-restricted-globals': 'off',
    // allow arrow functions
    'arrow-body-style': 'off',
    // allow react component as return for function
    'react/function-component-definition': 'off',
    // related to button click on non-button html element
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
  },
};
