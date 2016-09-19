/* @flow */

module.exports = {
  'parser': require.resolve('babel-eslint'),
  'extends': require.resolve('eslint-config-airbnb-base'),
  'rules': {
    'semi': [2, 'never'],
    'max-len': [1, 250],
    'func-names': 0,
    'no-console': 0,
    'comma-dangle': 2,
    'prefer-template': 0,
    'import/no-unresolved': 0,
    'no-restricted-syntax': [
      2,
      'DebuggerStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'no-plusplus': 0,
    'no-continue': 0,
    'prefer-arrow-callback': 0,
    'class-methods-use-this': 0,
    'generator-star-spacing': 0,
    'space-before-function-paren': 0,
    'import/no-extraneous-dependencies': 0
  },
  'globals': {
    'atom': true,
  },
  'env': {
    'node': true,
    'browser': true,
  }
}
