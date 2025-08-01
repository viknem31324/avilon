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
    'alpha-value-notation': undefined,
    'color-function-notation': undefined,
    'scss/at-if-closing-brace-space-after': 'always-intermediate',
    'value-keyword-case': ['lower', {
      ignoreKeywords: ['tabletLarge', 'wideTablet', 'wideDesktop'],
    }],
    'order/properties-order': [
      /* Позиционирование */
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',

      /* Блочная модель */
      'display',
      'box-sizing',
      'float',
      'clear',
      'overflow',
      'overflow-x',
      'overflow-y',
      'width',
      'height',
      'max-width',
      'max-height',
      'min-width',
      'min-height',
      'margin',
      'padding',

      /* Flex / Grid */
      'flex',
      'flex-grow',
      'flex-shrink',
      'flex-basis',
      'flex-direction',
      'flex-wrap',
      'justify-content',
      'align-items',
      'align-content',
      'grid',
      'grid-template-columns',
      'grid-template-rows',
      'grid-gap',
      'grid-column',
      'grid-row',

      /* Типографика */
      'font-family',
      'font-style',
      'font-size',
      'font-weight',
      'line-height',
      'letter-spacing',
      'text-align',
      'text-decoration',
      'text-transform',
      'white-space',
      'color',

      /* Оформление */
      'background',
      'background-color',
      'background-image',
      'background-position',
      'background-size',
      'background-repeat',
      'border',
      'border-radius',
      'box-shadow',
      'opacity',

      /* Анимация */
      'transition',
      'animation',

      /* Разное */
      'will-change',
      'outline',
      'visibility',
      'cursor',
      'pointer-events',
    ],
  },
};
