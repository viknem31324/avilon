import { action } from '@storybook/addon-actions';
import { vueRouter } from 'storybook-vue3-router';
import BaseBreadcrumbs from '../BaseBreadcrumbs.vue';

const ITEMS = [
  {
    text: 'item 1',
    href: '/item1',
  },
  {
    text: 'item 2',
    href: '/item2',
  },
  {
    text: 'item 3',
    href: '/item3',
  },
  {
    text: 'item 4',
    href: '/item4',
  },
  {
    text: 'item 5',
    href: '/item5',
  },
  {
    text: 'item 6',
    href: '/item6',
  },
  {
    text: 'item 7',
    href: '/item7',
    isAccent: true,
  },
];

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
    items: ITEMS,
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
