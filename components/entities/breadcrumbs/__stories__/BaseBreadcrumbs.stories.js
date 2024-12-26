import { action } from '@storybook/addon-actions';
import { vueRouter } from 'storybook-vue3-router';
import BaseBreadcrumbs from '../BaseBreadcrumbs.vue';
import items from './mocks/items';

const Template = args => ({
  components: { BaseBreadcrumbs },
  setup() {
    return { args };
  },
  template: '<BaseBreadcrumbs v-bind="args" />',
});

export default {
  title: '🔵 Macro components/Breadcrumbs',
  component: BaseBreadcrumbs,

  args: {
    items,
  },

  decorators: [
    vueRouter([], {
      beforeEach: (to, from) =>
        action('ROUTE CHANGED')({
          to: to,
          from: from,
        }),
    }),
  ],
};

export const Overview = {
  render: Template.bind(),

  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
};

export const BreadcrumbsWrap = {
  render: Template.bind(),

  decorators: [
    () => ({
      template: '<div style="max-width: 280px;"><story /></div>',
    }),
  ],
};
