/** @type {import('stylelint').Config} */
export default {
  customSyntax: 'postcss-html',
  extends: [
    'stylelint-config-clean-order/error',
    'stylelint-config-recommended-vue',
    'stylelint-config-standard-scss',
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      { ignoreAtRules: ['mixin', 'if', 'else', 'include', 'extend'] },
    ],
  },
};
