import * as yup from 'yup';

import BaseCheckbox from '../BaseCheckbox.vue';
import BaseCheckboxGroup from '../BaseCheckboxGroup.vue';
import { DEFAULT_SIZES } from '~/assets/constants/sizes';
import BaseForm from '~/components/entities/form/BaseForm.vue';

const Template = args => ({
  components: { BaseCheckbox },
  setup() {
    return {
      args,
      value: args.modelValue,
    };
  },
  template: `
    <BaseCheckbox v-bind="args" v-model="value" />
  `,
});

export default {
  title: '🟡 Micro components/Inputs/Checkbox',
  component: BaseCheckbox,

  argTypes: {
    disabled: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    modelValue: {
      control: 'object',
    },
    name: {
      control: 'text',
    },
    rules: {
      control: 'object',
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
    label: 'Checkbox',
    modelValue: 'checkbox',
    name: 'Checkbox',
    rules: undefined,
    size: 'm',
    value: 'Checkbox',
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
        BaseCheckbox,
      },

      setup() {
        return {
          valueA: '',
          valueB: 'B',
        };
      },

      template: `
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <BaseCheckbox v-model="valueA" name="default" value="A" label="Default checkbox" />
            <BaseCheckbox v-model="valueB" name="default" value="B" label="Default checked checkbox" />
          </div>
        `,
    };
  },
};

export const Disabled = {
  render: () => {
    return {
      components: {
        BaseCheckbox,
      },

      setup() {
        return {
          value: ['B', 'C'],
        };
      },

      template: `
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <BaseCheckbox v-model="value" name="checkbox_disabled" value="A" label="Disabled checkbox" disabled />
            <BaseCheckbox v-model="value" name="checkbox_disabled" value="B" label="Disabled checked checkbox" disabled />
          </div>
        `,
    };
  },

};

export const Size = {
  render: () => {
    return {
      components: {
        BaseCheckbox,
      },

      setup() {
        return {
          value: '',
        };
      },

      template: `
          <div style="display: flex; align-items: center; gap: 16px;">
            <BaseCheckbox v-model="value" name="checkbox_size" value="s" size="s" label="Small checkbox" />
            <BaseCheckbox v-model="value" name="checkbox_size" value="m" size="m" label="Medium checkbox" />
            <BaseCheckbox v-model="value" name="checkbox_size" value="l" size="l" label="Large checkbox" />
          </div>
        `,
    };
  },
};

export const Label = {
  render: () => {
    return {
      components: {
        BaseCheckbox,
      },

      setup() {
        return {
          value: '',
        };
      },

      template: `
          <div style="display: flex; align-items: center; gap: 16px;">
            <BaseCheckbox v-model="value" name="labelless" value="A" />
          </div>
        `,
    };
  },
};

export const Rules = {
  render: () => {
    return {
      components: {
        BaseCheckbox,
      },

      setup() {
        return {
          valueA: '',
          valueB: '',
          yupRules: yup.string().required('Обязательное поле'),
          customRules: is => !!is || 'Обязательное поле',
        };
      },

      template: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 24px;">
            <BaseCheckbox
              v-model="valueA"
              label="Yup validation"
              name="checkbox_rules_yup"
              :rules="yupRules"
              value="A"
            />
            <BaseCheckbox
              v-model="valueB"
              label="Custom validation"
              name="checkbox_rules_custom"
              :rules="customRules"
              value="B"
            />
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
        BaseCheckbox,
        BaseCheckboxGroup,
      },

      setup() {
        return {
          modelValue: '',
          modelValueGroup: [],
          items: [
            {
              label: 'checkbox-group-1',
              value: 'checkbox-group-1',
            },
            {
              label: 'checkbox-group-2',
              value: 'checkbox-group-2',
            },
          ],

          validationSchema: yup.object({
            'checkbox': yup.string().required('Обязательное поле'),
            'checkbox-group': yup
              .array()
              .min(1, 'Field must have at least 1 items'),
          }),
        };
      },

      template: `
          <BaseForm
            buttonLabel="Submit"
            title="Checkbox form"
            :validation-schema="validationSchema"
            validateOnMount
          >
            <BaseCheckbox
              v-model="modelValue"
              label="checkbox"
              name="checkbox"
              value="checkbox"
            />
            <BaseCheckboxGroup
              v-model="modelValueGroup"
              :items="items"
              name="checkbox-group"
            />
          </BaseForm>
        `,
    };
  },

};
