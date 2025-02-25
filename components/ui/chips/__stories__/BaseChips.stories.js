import { action } from '@storybook/addon-actions';
import { vueRouter } from 'storybook-vue3-router';
import BaseChips from '../BaseChips.vue';
// import { TAG_VARIANTS } from '../tags';
import { CHIPS_ITEMS } from './mocks/chips';
// import { DEFAULT_SIZES } from '/assets/constants/sizes';

const Template = args => ({
  components: { BaseChips },

  methods: {
    click: action('click'),
  },

  setup() {
    return {
      args,
    };
  },

  template: `
    <BaseChips
      v-bind="args"
      @click="click"
    />
  `,
});

export default {
  title: '🟡 Micro components/Chips',

  component: BaseChips,

  argTypes: {
    items: {
      control: 'object',
    },
  },

  args: {
    items: CHIPS_ITEMS,
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

// export const Variant = {
//   render: () => {
//     return {
//       components: {
//         BaseChips,
//       },

//       setup() {
//         return {
//           TAG_VARIANTS,
//           LINK_ICON_TAGS,
//         };
//       },

//       template: `
//           <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 24px;">
//             <BaseChips
//               v-for="tagVariant in Object.values(TAG_VARIANTS)"
//               :variant="tagVariant"
//               :items="LINK_ICON_TAGS"
//             />
//           </div>
//         `,
//     };
//   },
// };

// export const Size = {
//   render: () => {
//     return {
//       components: {
//         BaseChips,
//       },

//       setup() {
//         return {
//           DEFAULT_SIZES,
//           LINK_ICON_TAGS,
//         };
//       },

//       template: `
//           <div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 24px;">
//             <BaseChips
//               v-for="tagSize in DEFAULT_SIZES"
//               :size="tagSize"
//               :items="LINK_ICON_TAGS"
//             />
//           </div>
//         `,
//     };
//   },
// };
