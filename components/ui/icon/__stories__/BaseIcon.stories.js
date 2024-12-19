import BaseIcon from '../BaseIcon.vue';
import { ICONS } from '../BaseIcon.ts';

const Template = args => ({
  components: { BaseIcon },
  setup() {
    return { args };
  },
  template: '<BaseIcon v-bind="args" />',
});

export default {
  title: '🟡 Micro components/Icon',
  component: BaseIcon,

  argTypes: {
    icon: {
      control: {
        type: 'select',
      },

      options: ICONS,
    },
  },

  args: {
    icon: 'arrow-down',
  },
};

export const Overview = {
  render: Template.bind(),

  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/fcfhfIBNzr2wCkuuAzDC4F/%D0%A0%D0%95%D0%A5%D0%90%D0%A3-%E2%80%94-Design-System-%7C-Approval?type=design&node-id=4152-58188&mode=design&t=nQKSgK8Re9yRQmKi-0',
    },
  },
};

export const Icon = {
  render: () => {
    return {
      components: {
        BaseIcon,
      },

      setup() {
        const valueModel = ref('');
        const filteredIcons = computed(() => ICONS.filter(icon => icon.includes(valueModel.value)));

        return {
          valueModel,
          filteredIcons,
        };
      },

      template: `
          <div>
            <input
              v-model="valueModel"
              type="text"
              placeholder="Название иконки"
              style="
                padding: 10px;
                margin-bottom: 24px;
                border: 1px solid #ccc;
                border-radius: 4px;
                font-size: 14px;
                width: 100%;
                box-sizing: border-box;
                outline: none;"
            />
            <div style="display: grid; gap: 48px 34px; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));">
              <div v-for="icon in filteredIcons" :key="icon" style="display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center;">
                <BaseIcon
                  :icon="icon"
                />
                <span style="font-size: 14px; color: #818181;">{{ icon }}</span>
              </div>
            </div>
          </div>
        `,
    };
  },
};
