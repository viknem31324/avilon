import BasePlayer from '../BasePlayer.vue';

const Template = args => ({
  components: { BasePlayer },
  setup() {
    return { args };
  },
  template: '<BasePlayer v-bind="args"></BasePlayer>',
});

export default {
  title: '🟡 Micro components/Player',
  component: BasePlayer,

  argTypes: {
    video: {
      control: 'text',
    },
  },

  args: {
    video: 'https://rutube.ru/play/embed/c8364493574913b8c90e933b7fa5310e/',
    title: 'Заголовок описывающий видео',
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
