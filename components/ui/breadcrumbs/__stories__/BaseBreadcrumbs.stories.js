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
      url: 'https://www.figma.com/file/fcfhfIBNzr2wCkuuAzDC4F/%D0%A0%D0%95%D0%A5%D0%90%D0%A3-%E2%80%94-Design-System-%7C-Approval?type=design&node-id=1117-3388&mode=design&t=s7QhEf5kl71pnzMt-0',
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
