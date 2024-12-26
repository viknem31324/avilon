import { action } from '@storybook/addon-actions';
import { vueRouter } from 'storybook-vue3-router';
import BaseButton from '../BaseButton.vue';
import { BUTTON_TAGS, BUTTON_TYPES, BUTTON_VARIANTS, BUTTON_VARIANTS_VAL } from '../button';
import { ICONS } from '../../icon/icon';
import { DEFAULT_SIZES } from '/assets/constants/sizes';

const Template = args => ({
  components: { BaseButton },
  setup() {
    return { args };
  },
  template: '<BaseButton v-bind="args" />',
});

export default {
  title: '🟡 Micro components/Button',
  component: BaseButton,

  argTypes: {
    tag: {
      control: {
        type: 'select',
      },

      options: BUTTON_TAGS,
    },

    type: {
      control: {
        type: 'select',
      },

      options: BUTTON_TYPES,
    },

    href: {
      control: {
        type: 'text',
      },
    },

    label: {
      control: 'text',
    },

    variant: {
      control: {
        type: 'select',
      },

      options: BUTTON_VARIANTS_VAL,
    },

    size: {
      control: {
        type: 'select',
      },

      options: DEFAULT_SIZES,
    },

    icon: {
      control: {
        type: 'select',
      },

      options: ICONS,
    },

    disabled: {
      control: 'boolean',
    },

    download: {
      control: 'boolean',
    },

    loading: {
      control: 'boolean',
    },

    isReverse: {
      control: 'boolean',
    },
  },

  args: {
    tag: 'button',
    type: 'button',
    href: '/',
    label: 'Button',
    variant: BUTTON_VARIANTS.PRIMARY,
    size: 'm',
    icon: '',
    disabled: false,
    download: false,
    loading: false,
    isReverse: false,
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

export const Tag = {
  render: () => {
    return {
      components: {
        BaseButton,
      },

      setup() {
        return {
          BUTTON_TAGS,
        };
      },

      template: `
          <div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 24px;">
            <BaseButton
              v-for="buttonTag in BUTTON_TAGS"
              :tag="buttonTag"
              label="Button"
            />
          </div>
        `,
    };
  },
};

export const Variant = {
  render: () => {
    return {
      components: {
        BaseButton,
      },

      setup() {
        return {
          BUTTON_VARIANTS,
        };
      },

      template: `
          <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 24px;">
            <BaseButton
              v-for="buttonVariant in Object.values(BUTTON_VARIANTS)"
              :variant="buttonVariant"
              label="Button"
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
        BaseButton,
      },

      setup() {
        return {
          DEFAULT_SIZES,
        };
      },

      template: `
          <div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 24px;">
            <BaseButton
              v-for="buttonSize in DEFAULT_SIZES"
              :size="buttonSize"
              label="Button"
            />
          </div>
        `,
    };
  },
};

export const Icon = {
  render: () => {
    return {
      components: {
        BaseButton,
      },

      template: `
          <div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 24px;">
            <BaseButton label="Button" icon="chevron-right" />
            <BaseButton label="Button" icon="bell" />
            <BaseButton label="Button" icon="info" />
          </div>
        `,
    };
  },
};

export const Loading = {
  render: () => {
    return {
      components: {
        BaseButton,
      },

      template: '<BaseButton label="Button" loading />',
    };
  },
};

export const Reverse = {
  render: () => {
    return {
      components: {
        BaseButton,
      },

      template: '<BaseButton label="Button" icon="chevron-right" is-reverse />',
    };
  },
};
