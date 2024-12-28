import { action } from '@storybook/addon-actions';
import BaseSlider from '../BaseSlider.vue';
import { ITEMS } from './mocks/items';

const Template = args => ({
  components: { BaseSlider },
  setup() {
    return {
      args,
    };
  },
  methods: {
    changeSlide: action('changeActiveSlide'),
    nextSlide: action('nextSlide'),
    prevSlide: action('prevSlide'),
  },
  template: `
    <BaseSlider
      v-bind="args"
      @changeSlide="changeActiveSlide"
      @nextSlide="nextSlide"
      @prevSlide="prevSlide"
    >
      <template #slide="slide">
        <div style="margin: 0 auto; padding: 60px 0; text-align: center;">Slide {{ slide.name }}</div>
      </template>
    </BaseSlider>
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

    navigation: {
      control: 'boolean',
    },

    pagination: {
      control: 'boolean',
    },

    slides: {
      control: 'object',
    },

    slidesPerView: {
      control: 'number',
    },
  },

  args: {
    autoplay: 0,
    breakpoints: {
      540: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
    },
    navigation: true,
    pagination: true,
    slides: ITEMS,
    slidesPerView: 1,
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
      template: `<div>
          <story />
        </div>`,
    }),
  ],
};
