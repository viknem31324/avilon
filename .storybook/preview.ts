import type { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';
import { action } from '@storybook/addon-actions';

import './styles.scss';

setup((app) => {
  app.component('NuxtLink', {
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    methods: {
      log() {
        action('link target')(this.to);
      },
    },
    template: '<a @click="log"><slot></slot></a>',
  });
});

setup((app) => {
  app.component('ClientOnly', {
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    template: '<div><slot></slot></div>',
  });
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'General',
          'Guidelines',
          '🟡 Micro components',
          '🔵 Macro components',
          '🟣 Site components',
          '⚪ Product components',
        ],
      },
    },
    viewport: {
      viewports: {
        Mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
          type: 'mobile',
        },
        Tablet: {
          name: 'Tablet',
          styles: {
            width: '576px',
            height: '960px',
          },
          type: 'tablet',
        },
        Desktop: {
          name: 'Desktop',
          styles: {
            width: '1440px',
            height: '810px',
          },
          type: 'desktop',
        },
      },
    },
  },
};

export default preview;
