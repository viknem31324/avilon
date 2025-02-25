import { action } from '@storybook/addon-actions';
import { vueRouter } from 'storybook-vue3-router';
import BaseTags from '../BaseTags.vue';
import { TAG_VARIANTS } from '../tags';
import { LINK_ICON_TAGS } from './mocks/tags';
import { DEFAULT_SIZES } from '/assets/constants/sizes';

const Template = args => ({
  components: { BaseTags },

  methods: {
    click: action('click'),
  },

  setup() {
    const modelValue = ref(args.items);

    watch(() => args.items, () => {
      modelValue.value = args.items;
    });

    return {
      modelValue,
      args,
    };
  },

  template: `
    <BaseTags
      v-bind="args"
      v-model:items="modelValue"
      @click="click"
    />
  `,
});

export default {
  title: '🟡 Micro components/Tags',

  component: BaseTags,

  argTypes: {
    id: {
      control: 'text',
    },

    items: {
      control: 'object',
    },

    variant: {
      control: 'select',
      options: TAG_VARIANTS,
    },

    size: {
      control: 'select',
      options: DEFAULT_SIZES,
    },
  },

  args: {
    id: '',
    items: LINK_ICON_TAGS,
    variant: 'green',
    size: 'm',
  },

  decorators: [
    vueRouter([], {
      beforeEach: (to, from) =>
        action('ROUTE CHANGED')({
          to: to,
          from: from,
        }),
    }),
  ],
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

export const Variant = {
  render: () => {
    return {
      components: {
        BaseTags,
      },

      setup() {
        return {
          TAG_VARIANTS,
          LINK_ICON_TAGS,
        };
      },

      template: `
          <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 24px;">
            <BaseTags
              v-for="tagVariant in Object.values(TAG_VARIANTS)"
              :variant="tagVariant"
              :items="LINK_ICON_TAGS"
            />
          </div>
        `,
    };
  },
};

export const Size = {
  render: () => {
    return {
      components: {
        BaseTags,
      },

      setup() {
        return {
          DEFAULT_SIZES,
          LINK_ICON_TAGS,
        };
      },

      template: `
          <div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 24px;">
            <BaseTags
              v-for="tagSize in DEFAULT_SIZES"
              :size="tagSize"
              :items="LINK_ICON_TAGS"
            />
          </div>
        `,
    };
  },
};
