import BaseSlider from '../BaseSlider.vue';

const Template = args => ({
  components: { BaseSlider },
  setup() {
    return {
      args,
    };
  },
  template: `
    <BaseSlider v-bind="args"></BaseSlider>
  `,
});

export default {
  title: '🔵 Macro components/Slider',
  component: BaseSlider,

  argTypes: {
    autoplay: {
      control: 'number',
    },

    breakpoints: {
      control: 'object',
    },

    hideArrows: {
      control: 'boolean',
    },

    hidePagination: {
      control: 'boolean',
    },

    slides: {
      control: 'object',
    },

    slidesPerView: {
      control: 'number',
    },

    step: {
      control: 'number',
    },
  },

  args: {
    autoplay: 0,
    breakpoints: undefined,
    hideArrows: false,
    hidePagination: false,
    slides: [],
    slidesPerView: 1,
    step: 1,
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

  decorators: [
    () => ({
      template: `<div style="height: 100vh;">
          <story />
        </div>`,
    }),
  ],
};
