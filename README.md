eslintrc
========

My personal eslintrc, I've created a repo for it so I don't have to copy-paste this everywhere.

## Installation

```
npm install --save-dev eslint-config-steelbrain
```

Then create a configuration file `.eslintrc.json` and fill it with the following contents

```json
{
  "extends": "steelbrain"
}
```

and You're good to go! Happy ESLinting!

## Installation Notes

This ESLint configuration has the necessary plugins, even the **ESLint CLI** itself. So you should remove/not install it in your project, the flat - dependency installation will make sure the ESLint CLI from this package is accessible to `npm run` etc.

### License

This project is licensed under the terms of MIT License. See the LICENSE file for more info.
