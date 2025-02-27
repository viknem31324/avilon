import BaseHeading from '../BaseHeading.vue';
import { HEADING_LEVELS, HEADING_TAGS } from '../heading';

const Template = args => ({
  components: { BaseHeading },
  setup() {
    return { args };
  },
  template: '<BaseHeading v-bind="args">{{ args.default }}</BaseHeading>',
});

export default {
  title: '🟡 Micro components/Heading',
  component: BaseHeading,

  argTypes: {
    level: {
      control: 'select',
      options: HEADING_LEVELS,
    },
    tag: {
      control: 'select',
      options: HEADING_TAGS,
    },
  },

  args: {
    level: '2',
    tag: 'h2',
    default: 'Heading',
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
        BaseHeading,
      },

      setup() {
        return {
          HEADING_LEVELS,
        };
      },

      template: `
          <div>
            <BaseHeading
              v-for="level in HEADING_LEVELS"
              :key="level"
              :level="level"
            >
              Heading {{ level }}
            </BaseHeading>
          </div>
        `,
    };
  },
};
