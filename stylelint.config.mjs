/** @type {import('stylelint').Config} */
export default {
  customSyntax: 'postcss-html',
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue',
    'stylelint-config-clean-order',
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      { ignoreAtRules: ['mixin', 'if', 'else', 'include', 'extend'] },
    ],
    'declaration-empty-line-before': ['never', {
      except: [],
      ignore: ['after-declaration'],
    }],
  },
};
