import { action } from '@storybook/addon-actions';
import BaseInputCode from '../BaseInputCode.vue';

const Template = args => ({
  components: { BaseInputCode },
  setup() {
    return {
      args,
      value: args.modelValue,
    };
  },
  methods: {
    click: action('click'),
    blur: action('blur'),
    focus: action('focus'),
    keydown: action('keydown'),
    input: action('input'),
  },
  template:
    '<BaseInputCode v-bind="args" v-model="args.modelValue" @click="click" @blur="blur" @focus="focus" @keydown="keydown" @update:modelValue="input" />',
});

export default {
  title: '🟡 Micro components/Inputs/Input Code',
  component: BaseInputCode,

  argTypes: {
    errorText: {
      control: 'text',
    },
    modelValue: {
      control: 'text',
    },
    numberElements: {
      control: 'number',
    },
  },

  args: {
    errorText: '',
    modelValue: '',
    numberElements: 4,
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
