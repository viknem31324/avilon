import { MAP_VARIANTS } from '../map';
import ModuleMap from '../ModuleMap.vue';

const Template = args => ({
  components: { ModuleMap },
  setup() {
    return { args };
  },
  template: '<ModuleMap v-bind="args" />',
});

export default {
  title: '🟣 Site components/Map',
  component: ModuleMap,

  parameters: {
    layout: 'fullscreen',
  },

  argTypes: {
    id: {
      control: {
        type: 'text',
      },
    },

    addresses: {
      control: {
        type: 'object',
      },
    },

    apiKey: {
      control: {
        type: 'text',
      },
    },

    initialSettings: {
      control: {
        type: 'object',
      },
    },

    title: {
      control: {
        type: 'text',
      },
    },

    variant: {
      control: {
        type: 'select',
      },

      options: Object.keys(MAP_VARIANTS),
    },
  },

  args: {
    id: 'map',

    addresses: [
      {
        coordinates: [37.51296223925207, 55.68253266577515],

        data: {
          id: '2',
          address: 'Адрес 2',
          title: 'Адрес 2',
          phone: '8 800 888 88-88 (бесплатно по России)',
          workTime: 'пн-пт с 8:00 до 21:00',
        },
      },
      {
        coordinates: [37.51296223925207, 55.58253266577515],

        data: {
          id: '3',
          address: 'Адрес 3',
          title: 'Адрес 3',
          phone: '8 800 888 88-88 (бесплатно по России)',
          workTime: 'пн-пт с 8:00 до 21:00',
        },
      },
      {
        coordinates: [36.51296223925207, 55.68253266577515],

        data: {
          id: '4',
          address: 'Адрес 4',
          title: 'Адрес 4',
          phone: '8 800 888 88-88 (бесплатно по России)',
          workTime: 'пн-пт с 8:00 до 21:00',
        },
      },
      {
        coordinates: [37.51296223925207, 54.58253266577515],

        data: {
          id: '5',
          address: 'Адрес 5',
          title: 'Адрес 5',
        },
      },
      {
        coordinates: [34.72296223925207, 56.68253266577515],

        data: {
          id: '6',
          address: 'Адрес 6',
          title: 'Адрес 6',
          phone: '8 800 888 88-88 (бесплатно по России)',
        },
      },
      {
        coordinates: [37.71296223925207, 56.78253266577515],

        data: {
          id: '7',
          address: 'Адрес 7',
          title: 'Адрес 7',
          workTime: 'пн-пт с 8:00 до 21:00',
        },
      },
      {
        coordinates: [37.41296223925207, 56.68253266577515],

        data: {
          id: '8',
          address: 'Адрес 8',
          title: 'Адрес 8',
          phone: '8 800 888 88-88 (бесплатно по России)',
          workTime: 'пн-пт с 8:00 до 21:00',
        },
      },
    ],

    apiKey: '26adb9fb-f355-43c0-aa72-2f9c350e2027',

    initialSettings: {
      location: {
        center: [37.61296223925207, 55.68253266577515],
        zoom: 10,
      },
    },

    title: 'Наши адреса',
    variant: 'small',
  },
};

export const Overview = {
  render: Template.bind(),

  decorators: [
    () => ({
      template: '<div style="padding: 20px 0;"><story /></div>',
    }),
  ],

  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
};

export const Title = {
  render: Template.bind(),

  decorators: [
    () => ({
      template: '<div style="padding: 20px 0;"><story /></div>',
    }),
  ],

  args: {
    titile: 'Новый заголовок',
  },
};

export const VariantSmall = {
  render: Template.bind(),

  decorators: [
    () => ({
      template: '<div style="padding: 20px 0;"><story /></div>',
    }),
  ],

  args: {
    variant: 'small',
  },
};

export const VariantLarge = {
  render: Template.bind(),

  decorators: [
    () => ({
      template: '<div style="padding: 20px 0;"><story /></div>',
    }),
  ],

  args: {
    variant: 'large',
  },
};
