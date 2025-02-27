import { action } from '@storybook/addon-actions';
import { vueRouter } from 'storybook-vue3-router';
import BaseChips from '../BaseChips.vue';
import { CHIPS_VARIANTS } from '../chips';
import { CHIPS_ITEMS } from './mocks/chips';
import { DEFAULT_SIZES } from '/assets/constants/sizes';

const Template = args => ({
  components: { BaseChips },

  methods: {
    click: action('click'),
  },

  setup() {
    return {
      args,
    };
  },

  template: `
    <BaseChips
      v-bind="args"
      @click="click"
    />
  `,
});

export default {
  title: '🟡 Micro components/Chips',

  component: BaseChips,

  argTypes: {
    items: {
      control: 'object',
    },

    variant: {
      control: 'select',
      options: CHIPS_VARIANTS,
    },

    size: {
      control: 'select',
      options: DEFAULT_SIZES,
    },
  },

  args: {
    items: CHIPS_ITEMS,
    variant: 'green',
    size: 'm',
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

export const Variant = {
  render: () => {
    return {
      components: {
        BaseChips,
      },

      setup() {
        return {
          CHIPS_ITEMS,
          CHIPS_VARIANTS,
        };
      },

      template: `
          <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 24px;">
            <BaseChips
              v-for="chipsVariant in CHIPS_VARIANTS"
              :variant="chipsVariant"
              :items="CHIPS_ITEMS"
            />
          </div>
        `,
    };
  },
};

export const Size = {
  render: () => {
    return {
      components: {
        BaseChips,
      },

      setup() {
        return {
          DEFAULT_SIZES,
          CHIPS_ITEMS,
        };
      },

      template: `
          <div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 24px;">
            <BaseChips
              v-for="chipsSize in DEFAULT_SIZES"
              :size="chipsSize"
              :items="CHIPS_ITEMS"
            />
          </div>
        `,
    };
  },
};
