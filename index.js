/* @flow */

module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'plugin:flowtype/recommended', 'prettier', 'prettier/flowtype', 'prettier/react'],
  plugins: ['flowtype', 'prettier'],
  rules: {
    'func-names': 'off',
    'no-console': 'off',
    'no-plusplus': 'off',
    'no-continue': 'off',
    'prefer-arrow-callback': 'off',
    'class-methods-use-this': 'off',
    'generator-star-spacing': 'off',
    'react/jsx-filename-extension': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    'prettier/prettier': 'error',
  },
  globals: {},
  env: {
    node: true,
    browser: true,
  },
}
