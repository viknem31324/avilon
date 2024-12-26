import BaseLoading from '../BaseLoading.vue';

const Template = args => ({
  components: { BaseLoading },
  setup() {
    return { args };
  },
  template: '<BaseLoading v-bind="args" style="position: static;" />',
});

export default {
  title: '🟡 Micro components/Loading',
  component: BaseLoading,

  argTypes: {
    isLoading: {
      control: {
        type: 'boolean',
      },
    },
  },

  args: {
    isLoading: true,
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
