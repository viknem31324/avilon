import { action } from '@storybook/addon-actions';

import BaseTooltip from '../BaseTooltip.vue';
import { TOOLTIP_POSITION } from '../tooltip';
import { DEFAULT_SIZES } from '~/assets/constants/sizes';

const Template = args => ({
  components: { BaseTooltip },
  setup() {
    return { args };
  },
  methods: {
    close: action('close'),
    open: action('open'),
  },
  template: `
  <div style="display: flex; flex-direction: column; gap: 140px; padding-bottom: 140px">
    <BaseTooltip v-bind="args" @close="close" @open="open">
      {{ args.default }}
      <template v-if="args.content" #content>
        {{ args.content }}
      </template>
    </BaseTooltip>
  </div>
  `,
});

export default {
  title: '🔵 Macro components/Tooltip',
  component: BaseTooltip,

  argTypes: {
    position: {
      control: 'select',
      options: TOOLTIP_POSITION,
    },

    tooltipText: {
      control: 'text',
    },

    size: {
      control: 'select',
      options: DEFAULT_SIZES,
    },

    showButton: {
      control: 'boolean',
    },
  },

  args: {
    position: 'bottom',
    tooltipText:
      'Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean vulputate eleifend tellus.',
    size: 'm',
    showButton: false,
    default: 'Tooltip',
    content: '',
  },
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

export const CloseIcon = {
  render: () => {
    return {
      components: {
        BaseTooltip,
      },

      setup() {
        return {
          DEFAULT_SIZES,
        };
      },

      template: `
          <div style="display: flex; flex-direction: column; gap: 140px; padding-bottom: 140px">
            <BaseTooltip
              showButton
              tooltip-text="Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean vulputate eleifend tellus."
            >
              Tooltip
            </BaseTooltip>
          </div>
        `,
    };
  },
};

export const Sizes = {
  render: () => {
    return {
      components: {
        BaseTooltip,
      },

      setup() {
        return {
          DEFAULT_SIZES,
        };
      },

      template: `
          <div style="display: flex; flex-direction: column; gap: 140px;">
            <BaseTooltip
              v-for="size in DEFAULT_SIZES"
              :key="'tooltip_' + size"
              :size="size"
              tooltip-text="Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean vulputate eleifend tellus."
              show-button
            >
              Tooltip {{ size }}
            </BaseTooltip>
          </div>
        `,
    };
  },
};

export const Position = {
  render: () => {
    return {
      components: {
        BaseTooltip,
      },

      setup() {
        return {
          TOOLTIP_POSITION,
        };
      },

      template: `
          <div style="display: flex; flex-direction: column; gap: 140px; align-items: center; padding-top: 140px; padding-bottom: 660px">
            <BaseTooltip
              v-for="position in TOOLTIP_POSITION"
              :key="'tooltip_' + position"
              :position="position"
              tooltip-text="Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean vulputate eleifend tellus."
              show-button
            >
              Tooltip {{ position }}
            </BaseTooltip>
          </div>
        `,
    };
  },
};

export const Slot = {
  render: () => {
    return {
      components: {
        BaseTooltip,
      },

      template: `
          <div style="display: flex; flex-direction: column; gap: 140px; align-items: center; padding-top: 140px">
            <BaseTooltip position="top" show-button>
              Tooltip
              <template #content>
                Custom <i>текст</i>
              </template>
            </BaseTooltip>
          </div>
        `,
    };
  },
};
