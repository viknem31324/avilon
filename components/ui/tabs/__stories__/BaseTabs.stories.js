import BaseTabs from '../BaseTabs.vue';
import { DEFAULT_SIZES_WITH_EMPTY } from '~/assets/constants/sizes';

const Template = args => ({
  components: { BaseTabs },
  data() {
    return {
      id: args.id,
    };
  },
  setup() {
    return { args };
  },
  template: '<BaseTabs v-bind="args" v-model:id="id" />',
});

export default {
  title: '🟡 Micro components/Tabs',
  component: BaseTabs,

  argTypes: {
    id: {
      control: 'text',
    },

    items: {
      control: 'object',
    },

    moreTabLabel: {
      control: 'text',
    },

    size: {
      control: 'select',
      options: DEFAULT_SIZES_WITH_EMPTY,
    },
  },

  args: {
    id: '9',

    items: [
      {
        id: '1',
        title: 'Описание',
      },
      {
        id: '2',
        title: 'Характеристики',
      },
      {
        id: '3',
        title: 'Видео',
      },
      {
        id: '4',
        title: 'Инструкции',
      },
      {
        id: '5',
        title: 'Гарантия',
      },
      {
        id: '6',
        title: 'Отзывы',
      },
      {
        id: '7',
        title: 'Tab 7',
        count: '3',
      },
      {
        id: '8',
        title: 'Big More Tab 8',
        count: '3',
      },
      {
        id: '9',
        title: 'Tab 9',
        count: '3',
      },
      {
        id: '10',
        title: 'Tab 10',
        count: '5',
      },
    ],

    moreTabLabel: 'More...',
    size: '',
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
      template: '<div style="height: 250px;"><story /></div>',
    }),
  ],
};

export const Width = {
  render: Template.bind(),

  decorators: [
    () => ({
      template: '<div style="width: 600px; height: 400px;"><story /></div>',
    }),
  ],
};
