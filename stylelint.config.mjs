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
      { ignoreAtRules: ['mixin', 'if', 'else', 'include', 'extend', 'use', 'function', 'warn', 'return', 'forward', 'each'] },
    ],
    'declaration-empty-line-before': ['never', {
      except: [],
      ignore: ['after-declaration'],
    }],
    'at-rule-empty-line-before': undefined,
    'scss/at-else-empty-line-before': undefined,
    'scss/at-if-closing-brace-newline-after': undefined,
    'scss/at-if-closing-brace-space-after': 'always-intermediate',
    'value-keyword-case': ['lower', {
      ignoreKeywords: ['tabletLarge', 'wideTablet', 'wideDesktop'],
    }],
  },
};
