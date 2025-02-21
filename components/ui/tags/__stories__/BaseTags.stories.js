import { action } from '@storybook/addon-actions';
import { vueRouter } from 'storybook-vue3-router';

import BaseTags from '../BaseTags.vue';

import { DEFAULT_TAGS, LINK_ICON_TAGS, LINK_TAGS } from './mocks/tags';

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
  },

  args: {
    id: '',
    items: DEFAULT_TAGS,
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

export const Link = {
  render: () => {
    return {
      components: {
        BaseTags,
      },

      data() {
        return {
          linkTags: LINK_TAGS,
          linkIconTags: LINK_ICON_TAGS,
        };
      },

      methods: {
        click: action('click'),
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

      template: `
      <div>
        <h5>Без иконок</h5>
        <BaseTags v-model:items="linkTags" @click="click" />
        <h5>С иконками</h5>
        <BaseTags v-model:items="linkIconTags" style="margin-top: 10px;" @click="click" />
      </div>`,
    };
  },
};
