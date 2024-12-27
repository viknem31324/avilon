import BaseText from '../BaseText.vue';
import { TEXT_TAGS, TEXT_WEIGHTS } from '../text';
import { DEFAULT_SIZES_WITH_EXTRA_SMALL } from '/assets/constants/sizes';

const Template = args => ({
  components: { BaseText },
  setup() {
    return { args };
  },
  template: '<BaseText v-bind="args">{{ args.default }}</BaseText>',
});

export default {
  title: '🟡 Micro components/Text',
  component: BaseText,

  argTypes: {
    fluid: {
      control: 'boolean',
    },

    size: {
      control: 'select',
      options: DEFAULT_SIZES_WITH_EXTRA_SMALL,
    },

    tag: {
      control: 'select',
      options: TEXT_TAGS,
    },

    weight: {
      control: 'select',
      options: TEXT_WEIGHTS,
    },
  },

  args: {
    fluid: false,
    size: 'm',
    tag: 'div',
    weight: 'medium',
    default: 'Text',
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

export const Levels = {
  render: () => {
    return {
      components: {
        BaseText,
      },

      setup() {
        return {
          DEFAULT_SIZES_WITH_EXTRA_SMALL,
        };
      },

      template: `
          <div>
            <BaseText
              v-for="size in DEFAULT_SIZES_WITH_EXTRA_SMALL"
              :key="size"
              :size="size"
              tag="p"
            >
              Text {{ size }}
            </BaseText>
          </div>
        `,
    };
  },
};
