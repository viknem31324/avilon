import { action } from '@storybook/addon-actions';
import { vueRouter } from 'storybook-vue3-router';

import BaseLink from '../BaseLink.vue';
import { BASE_LINK_VARIANTS_VAL } from '../link';
import { DEFAULT_SIZES_WITH_EMPTY as LINK_SIZES } from '/assets/constants/sizes';

const Template = args => ({
  components: { BaseLink },
  setup() {
    return { args };
  },
  template: `
    <BaseLink v-bind="args">
      <template v-if="args.default" #default>
        {{ args.default }}
      </template>
    </BaseLink>
  `,
});

export default {
  title: '🟡 Micro components/Link',
  component: BaseLink,

  argTypes: {
    label: {
      control: 'text',
    },

    href: {
      control: 'text',
    },

    size: {
      control: 'select',
      options: LINK_SIZES,
    },

    variant: {
      control: 'select',
      options: BASE_LINK_VARIANTS_VAL,
    },
  },

  args: {
    label: 'Lorem ipsum',
    href: '#',
    size: '',
    variant: 'green',
    default: '',
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

export const Sizes = {
  render: () => {
    return {
      components: {
        BaseLink,
      },

      setup() {
        return {
          LINK_SIZES,
        };
      },

      template: `
          <div style="display: flex; align-items: center; gap: 20px;">
            <BaseLink v-for="linkSize in LINK_SIZES" :size="linkSize" label="Lorem ipsum" :href="'/?size=linkSize'" />
          </div>
        `,
    };
  },
};

export const Variant = {
  render: () => {
    return {
      components: {
        BaseLink,
      },

      setup() {
        return {
          BASE_LINK_VARIANTS_VAL,
        };
      },

      template: `
          <div style="display: flex; align-items: center; gap: 20px;">
            <BaseLink v-for="variant in BASE_LINK_VARIANTS_VAL" :variant="variant" label="Lorem ipsum" href="#" />
          </div>
        `,
    };
  },
};
