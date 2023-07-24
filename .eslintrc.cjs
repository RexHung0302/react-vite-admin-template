/* eslint-env node */

// 以上一段代碼是為了解決 module is not defined 的錯誤，詳細可參考  https://juejin.cn/s/eslintrc.js%20module%20is%20not%20defined

module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', 'plugin:prettier/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh', '@typescript-eslint', 'react', 'react-hooks', 'import', 'prettier'],
  settings: {
    // 解決 import/extensions 及 import/no-unresolved 問題
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    // 0 = off, 1 = warn, 2 = error
    // suppress errors for missing 'import React' in files
    'react/react-in-jsx-scope': 'off',
    // file extension rule
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.ts', '.tsx'],
      },
    ],
    quotes: [2, 'single'],
    'prefer-arrow-callback': [2, { allowNamedFunctions: true }],
    semi: [2, 'always'],
    'operator-linebreak': [2, 'after', { overrides: { '?': 'before', ':': 'before' } }],
    'max-len': [
      2,
      {
        code: 200,
        tabWidth: 2,
        ignoreComments: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'array-element-newline': [2, { multiline: true }],
    'array-bracket-newline': 'off',
    'arrow-body-style': 'off',
    'react/function-component-definition': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    // 解決 import/extensions 問題
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/require-default-props': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'no-shadow': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'prettier/prettier': 'error',
  },
  // 排除檢查
  ignorePatterns: ['node_modules/', 'build/', 'dist/', 'public/', 'postcss.config.js', 'tailwind.config.js'],
};
