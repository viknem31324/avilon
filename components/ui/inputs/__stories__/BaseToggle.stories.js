import * as yup from 'yup';
import { action } from '@storybook/addon-actions';

import BaseToggle from '../BaseToggle.vue';
import { TOGGLE_VARIANTS } from '../types/toggle';
import BaseForm from '~/components/entities/form/BaseForm.vue';
import { DEFAULT_SIZES } from '~/assets/constants/sizes';

const Template = args => ({
  components: { BaseToggle },
  setup() {
    return {
      args,
    };
  },
  methods: {
    update: action('update:modelValue'),
  },
  template: `
    <div>
      <BaseToggle v-bind="args" @update:modelValue="update" />
    </div>
  `,
});

export default {
  title: '🟡 Micro components/Inputs/Toggle',
  component: BaseToggle,

  argTypes: {
    disabled: {
      control: {
        type: 'boolean',
      },
    },

    modelValue: {
      control: {
        type: 'boolean',
      },
    },

    name: {
      control: {
        type: 'text',
      },
    },

    rules: {
      control: {
        type: 'object',
      },
    },

    size: {
      control: {
        type: 'select',
      },

      options: DEFAULT_SIZES,
    },

    variant: {
      control: {
        type: 'select',
      },

      options: TOGGLE_VARIANTS,
    },
  },

  args: {
    disabled: false,
    modelValue: false,
    name: 'Toggle',
    rules: undefined,
    size: 'm',
    variant: 'green',
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
        BaseToggle,
      },

      setup() {
        return {
          valueA: false,
          valueB: true,
        };
      },

      template: `
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <BaseToggle v-model="valueA" name="default_a" />
            <BaseToggle v-model="valueB" name="default_b" />
          </div>
        `,
    };
  },
};

export const Disabled = {
  render: () => {
    return {
      components: {
        BaseToggle,
      },

      setup() {
        return {
          valueA: false,
          valueB: true,
        };
      },

      template: `
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <BaseToggle v-model="valueA" name="checkbox_disabled_a" disabled />
            <BaseToggle v-model="valueB" name="checkbox_disabled_b" disabled />
          </div>
        `,
    };
  },
};

export const Variants = {
  render: () => {
    return {
      components: {
        BaseToggle,
      },

      setup() {
        return {
          valueA: true,
          valueB: true,
        };
      },

      template: `
          <div style="display: flex; align-items: center; gap: 16px;">
            <BaseToggle v-model="valueA" name="checkbox_variant_a" variant="green" />
            <BaseToggle v-model="valueB" name="checkbox_variant_b" variant="red" />
          </div>
        `,
    };
  },
};

export const Sizes = {
  render: () => {
    return {
      components: {
        BaseToggle,
      },

      setup() {
        return {
          value: true,
        };
      },

      template: `
          <div style="display: flex; align-items: center; gap: 16px;">
            <BaseToggle v-model="value" name="checkbox_size_s" value="s" size="s" />
            <BaseToggle v-model="value" name="checkbox_size_m" value="m" size="m" />
            <BaseToggle v-model="value" name="checkbox_size_l" value="l" size="l" />
          </div>
        `,
    };
  },
};

export const Rules = {
  render: () => {
    return {
      components: {
        BaseToggle,
      },

      setup() {
        return {
          valueA: false,
          valueB: false,
          yupRules: yup.bool().oneOf([true], 'Обязательное поле'),
          customRules: is => is || 'Обязательное поле',
        };
      },

      template: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 24px;">
            <div>
              <p>Yap rule</p>
              <BaseToggle
                v-model="valueA"
                name="checkbox_rules_yup"
                :rules="yupRules"
              />
            </div>
            <div>
              <p>Custom rule</p>
              <BaseToggle
                v-model="valueB"
                name="checkbox_rules_custom"
                :rules="customRules"
              />
            </div>
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
        BaseToggle,
      },
      setup() {
        return {
          modelValue: false,
          validationSchema: yup.object({
            toggle: yup.bool().oneOf([true], 'Обязательное поле'),
          }),
        };
      },
      template: `
        <BaseForm
          buttonLabel="Submit"
          title="Toggle form"
          :validation-schema="validationSchema"
          validateOnMount
        >
          <BaseToggle v-model="modelValue" name="toggle" />
        </BaseForm>
      `,
    };
  },
};
