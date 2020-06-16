module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint"
  },
  // 此项指定环境的全局变量，下面的配置指定为浏览器环境
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  // 此项是用来配置标准的js风格，就是说写代码的时候要规范的写，如果你使用vs-code我觉得应该可以避免出错
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended"
  ],
  rules: {
    'no-console': 'off',
    'no-irregular-whitespace': 'off',
    'no-extra-parens': 'off',
    'no-extra-semi': 'off'   
  }
}
