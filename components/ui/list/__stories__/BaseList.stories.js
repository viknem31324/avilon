import BaseList from '../BaseList.vue';
import { DEFAULT_SIZES_WITH_EXTRA_SMALL } from '~/assets/constants/sizes';

const Template = args => ({
  components: { BaseList },
  setup() {
    return { args };
  },
  template: `<BaseList v-bind="args">
      <template #for="{ id, data }">
        Item {{ id }} - {{ data.title }} - {{ data.description || 'No description' }}
      </template>
    </BaseList>`,
});

export default {
  title: '🟡 Micro components/Base List',
  component: BaseList,

  argTypes: {
    fluid: {
      control: 'boolean',
    },
    items: {
      control: 'object',
    },
    size: {
      control: 'select',
      options: DEFAULT_SIZES_WITH_EXTRA_SMALL,
    },
    tag: {
      control: 'select',
      options: ['ol', 'ul'],
    },
  },

  args: {
    fluid: false,
    items: [
      {
        id: '1',
        data: {
          title: 'Loren ipsum dolor sit amet',
        },
      },
      {
        id: '2',
        data: {
          title: 'Loren ipsum dolor sit amet',
        },
      },
      {
        id: '3',
        data: {
          title: 'Loren ipsum dolor sit amet',
          description:
            'Enim velit augue felis tempor sit blandit. Mi lectus gravida nullam tortor cras augue.',
        },
      },
      {
        id: '4',
        data: {
          title: 'Loren ipsum dolor sit amet',
          description:
            'Enim velit augue felis tempor sit blandit. Mi lectus gravida nullam tortor cras augue.',
        },
      },
    ],
    size: 'm',
    tag: 'ul',
  },
};

export const Overview = {
  render: Template.bind(),
};
