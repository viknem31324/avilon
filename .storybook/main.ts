import type { StorybookConfig } from '@storybook/vue3-vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

const config: StorybookConfig = {
  stories: [
    '../components/**/*.mdx',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-essentials',
    '@storybook/addon-designs',
    '@storybook/addon-controls',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    const { mergeConfig } = await import('vite');

    return mergeConfig(config, {
      plugins: [
        vue(),
        AutoImport({
          imports: [
            'vue',
            'vue-router',
            'vee-validate',
          ],
          vueTemplate: true,
        }),
        Components({
          dirs: ['./components/'],
          dts: true,
        }),
      ],
      resolve: {
        alias: {
          '~/': '/',
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: '@use "~/assets/scss/helpers/index.scss" as *;',
          },
        },
      },
    });
  },
};
export default config;
