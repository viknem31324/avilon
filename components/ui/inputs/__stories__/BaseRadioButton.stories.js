import * as yup from 'yup';

import BaseRadioButton from '../BaseRadioButton.vue';
import BaseRadioGroup from '../BaseRadioGroup.vue';
import { DEFAULT_SIZES } from '~/assets/constants/sizes';
import BaseForm from '~/components/entities/form/BaseForm.vue';

const Template = args => ({
  components: { BaseRadioButton },
  data() {
    return {
      value: args.modelValue,
    };
  },
  setup() {
    return { args };
  },
  template: '<BaseRadioButton v-bind="args" v-model:model-value="value" />',
});

export default {
  title: '🟡 Micro components/Inputs/Radiobutton',
  component: BaseRadioButton,

  argTypes: {
    disabled: {
      control: 'boolean',
    },

    label: {
      control: 'text',
    },

    modelValue: {
      control: 'text',
    },

    name: {
      control: 'text',
    },

    size: {
      control: 'select',
      options: DEFAULT_SIZES,
    },

    value: {
      control: 'text',
    },
  },

  args: {
    disabled: false,
    label: 'Radiobutton',
    modelValue: '',
    name: 'Radiobutton',
    size: 'm',
    value: 'Radiobutton',
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

export const Default = {
  render: () => {
    return {
      components: {
        BaseRadioButton,
      },

      data() {
        return {
          value: 'B',
        };
      },

      template: `
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <BaseRadioButton v-model="value" name="default" value="A" label="Default radiobutton" />
            <BaseRadioButton v-model="value" name="default" value="B" label="Default checked radiobutton" />
          </div>
        `,
    };
  },
};

export const Disabled = {
  render: () => {
    return {
      components: {
        BaseRadioButton,
      },

      data() {
        return {
          value: 'B',
        };
      },

      template: `
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <BaseRadioButton v-model="value" name="disabled" value="A" label="Disabled radiobutton" disabled />
            <BaseRadioButton v-model="value" name="disabled" value="B" label="Disabled checked radiobutton" disabled />
          </div>
        `,
    };
  },

};

export const Size = {
  render: () => {
    return {
      components: {
        BaseRadioButton,
      },

      data() {
        return {
          value: '',
        };
      },

      template: `
          <div style="display: flex; align-items: center; gap: 16px;">
            <BaseRadioButton v-model="value" name="size" value="s" size="s" label="Small radiobutton" />
            <BaseRadioButton v-model="value" name="size" value="m" size="m" label="Medium radiobutton" />
            <BaseRadioButton v-model="value" name="size" value="l" size="l" label="Large radiobutton" />
          </div>
        `,
    };
  },
};

export const Label = {
  render: () => {
    return {
      components: {
        BaseRadioButton,
      },

      data() {
        return {
          value: '',
        };
      },

      template: `
          <div style="display: flex; align-items: center; gap: 16px;">
            <BaseRadioButton v-model="value" name="labelless" value="A" />
          </div>
        `,
    };
  },
};

export const Error = {
  render: () => {
    return {
      components: {
        BaseForm,
        BaseRadioGroup,
      },

      setup() {
        return {
          items: [
            {
              disabled: false,
              label: 'radio-group-1',
              value: '1',
            },
            {
              disabled: false,
              label: 'radio-group-2',
              value: '2',
            },
          ],

          validationSchema: yup.object({
            'radio-group': yup.string().required('Обязательное поле'),
          }),
        };
      },

      template: `
          <BaseForm
            buttonLabel="Submit"
            :items="items"
            title="RadioButton form"
            :validation-schema="validationSchema"
            validateOnMount
          >
            <BaseRadioGroup :items="items" name="radio-group" />
          </BaseForm>
        `,
    };
  },

};
