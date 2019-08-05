module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['prettier'],
  rules: {
    'func-names': 'off',
    'no-console': 'off',
    'no-continue': 'off',
    'generator-star-spacing': 'off',
    'lines-between-class-members': 'off',
    'react/jsx-filename-extension': 'off',
    'prettier/prettier': 'error',
  },
  globals: {},
  env: {
    node: true,
    browser: true,
  },
}
