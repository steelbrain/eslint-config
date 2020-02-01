module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'airbnb/hooks',
    require.resolve('eslint-plugin-import/config/typescript'),
    'prettier',
    'prettier/react',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'func-names': 'off',
    'no-console': 'off',
    'no-continue': 'off',
    'generator-star-spacing': 'off',
    'lines-between-class-members': 'off',
    'react/jsx-filename-extension': 'off',
    'prettier/prettier': 'error',
    'no-use-before-define': 'off',
    // ^ Provided by typescript-eslint
    'no-unused-vars': 'off',
    // ^ Provided by typescript-eslint
    '@typescript-eslint/ban-ts-ignore': 'warn',
    // Proper errors from bad values are caught by TSC
    // This is too noisy to use in dev in the meanwhile
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/camelcase': 'off',
    // Fancy feature, not **required** and annoying in dev
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    // TS Indent config conflicts with our config.
    '@typescript-eslint/indent': 'off',
  },
  globals: {},
  env: {
    node: true,
    browser: true,
  },
}
