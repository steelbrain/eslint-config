eslintrc
========

My personal eslintrc, I've created a repo for it so I don't have to copy-paste this everywhere, install globally and extend it in projects.

## Installation

This ESLint configuration installs the necessary plugins and the ESLint engine itself so you should not include them in your project. You should only ever need to install this configuration

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

### License

This project is licensed under the terms of MIT License. See the LICENSE file for more info.
