/* @flow */

module.exports = {
  'parser': require.resolve('babel-eslint'),
  'extends': require.resolve('eslint-config-airbnb-base'),
  'rules': {
    'semi': [2, 'never'],
    'max-len': [1, 250],
    'no-console': 0,
    'comma-dangle': 2,
    'prefer-template': 0,
    'import/no-unresolved': 0,
    'prefer-arrow-callback': 0,
    'generator-star-spacing': 0,
  },
  'globals': {
    'atom': true,
  }
}
