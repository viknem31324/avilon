import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  ignores: [
    '.cdci/*',
    '.husky/',
    '.gitignore',
    '.nuxt/',
    '.output/',
    'public/',
  ],
})
  // https://eslint.style/guide/why
  .override('nuxt/stylistic', {
    rules: {
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
        multilineDetection: 'brackets',
      }],
      'vue/max-attributes-per-line': ['error', { singleline: { max: 3 }, multiline: { max: 1 } }],
    },
  });
