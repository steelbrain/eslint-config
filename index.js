/* @flow */

module.exports = {
  parser: require.resolve('babel-eslint'),
  extends: [require.resolve('eslint-config-airbnb'), 'plugin:flowtype/recommended'],
  'rules': {
    'semi': ['error', 'never'],
    'max-len': ['warn', 250],
    'func-names': 'off',
    'no-console': 'off',
    'comma-dangle': 'error',
    'no-plusplus': 'off',
    'no-continue': 'off',
    'prefer-arrow-callback': 'off',
    'class-methods-use-this': 'off',
    'generator-star-spacing': 'off',
    'space-before-function-paren': 'off',
    'react/jsx-filename-extension': 'off',
    'jsx-a11y/href-no-hash': 'off',
  },
  'globals': {
    'atom': true,
  },
  'env': {
    'node': true,
    'browser': true,
  },
}
