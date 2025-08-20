import { action } from '@storybook/addon-actions';
import * as yup from 'yup';
import BaseInputPhone from '../BaseInputPhone.vue';
import { PHONE_LOCALES } from '../helpers/mocks';
import { DEFAULT_SIZES } from '~/assets/constants/sizes';
import BaseForm from '~/components/entities/form/BaseForm.vue';

const Template = args => ({
  components: { BaseInputPhone },
  setup() {
    return { args };
  },
  methods: {
    blur: action('blur'),
    focus: action('focus'),
    input: action('input'),
  },
  template:
    '<BaseInputPhone v-bind="args" @blur="blur" @focus="focus" @update:modelValue="input" />',
});

export default {
  title: '🟡 Micro components/Inputs/InputPhone',
  component: BaseInputPhone,

  argTypes: {
    disabled: {
      control: 'boolean',
    },
    errorText: {
      control: 'text',
    },
    id: {
      control: 'text',
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
    placeholder: {
      control: 'text',
    },
    required: {
      control: 'boolean',
    },
    rules: {
      control: 'object',
    },
    size: {
      control: 'select',
      options: DEFAULT_SIZES,
    },
    mask: {
      control: 'text',
    },
    itemsPhone: {
      control: 'object',
    },
  },

  args: {
    disabled: false,
    errorText: '',
    id: '',
    label: 'Label',
    modelValue: '',
    name: 'input',
    placeholder: 'Placeholder',
    required: false,
    rules: undefined,
    size: 'm',
    mask: '',
    itemsPhone: PHONE_LOCALES,
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

export const Size = {
  render: () => {
    return {
      components: {
        BaseInputPhone,
      },

      setup() {
        return {
          DEFAULT_SIZES,
          PHONE_LOCALES,
        };
      },

      template: `
          <div style="display: grid; gap: 60px 40px; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr))">
            <div style="display: flex; flex-direction: column; gap: 24px;">
              <BaseInputPhone
                v-for="inputPhoneSize in DEFAULT_SIZES"
                label="Label"
                placeholder="+7"
                :name="inputPhoneSize"
                :size="inputPhoneSize"
                itemsPhone="PHONE_LOCALES"
              />
            </div>
          </div>
        `,
    };
  },

};

export const States = {
  render: () => {
    return {
      components: {
        BaseInputPhone,
      },

      setup() {
        return {
          PHONE_LOCALES,
        };
      },

      template: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 24px;">
            <BaseInputPhone
              name="input_phone_states_1"
              placeholder="+7"
              itemsPhone="PHONE_LOCALES"
            />
            <BaseInputPhone
              name="input_phone_states_2"
              placeholder="+7"
              modelValue="987 995 55 55"
              itemsPhone="PHONE_LOCALES"
            />
            <BaseInputPhone
              name="input_phone_states_3"
              placeholder="+7"
              disabled
              itemsPhone="PHONE_LOCALES"
            />
            <BaseInputPhone
              name="input_phone_states_4"
              placeholder="+7"
              modelValue="987 995 55 55"
              disabled
              itemsPhone="PHONE_LOCALES"
            />
          </div>
        `,
    };
  },
};

export const Required = {
  render: () => {
    return {
      components: {
        BaseInputPhone,
      },

      setup() {
        return {
          PHONE_LOCALES,
        };
      },

      template: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 24px;">
            <BaseInputPhone
              name="input_phone_required_1"
              placeholder="+7"
              label="Label"
              required
              itemsPhone="PHONE_LOCALES"
            />
            <BaseInputPhone
              name="input_phone_required_2"
              disabled
              placeholder="+7"
              label="Label"
              required
              itemsPhone="PHONE_LOCALES"
            />
          </div>
        `,
    };
  },

};

export const Mask = {
  render: () => {
    return {
      components: {
        BaseInputPhone,
      },

      setup() {
        return {
          PHONE_LOCALES,
        };
      },

      template: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 24px;">
            <BaseInputPhone
              name="Mask"
              placeholder="+7"
              label="Label"
              mask="+7(###) ###-##-##"
              itemsPhone="PHONE_LOCALES"
            />
            <BaseInputPhone
              name="MaskBy"
              placeholder="+375"
              label="Label"
              mask="+375(##) ###-##-##"
              itemsPhone="PHONE_LOCALES"
            />
          </div>
        `,
    };
  },
};

export const Rules = {
  render: () => {
    return {
      components: {
        BaseInputPhone,
      },
      data() {
        return {
          errorText: '',
        };
      },
      setup() {
        const yupRules = yup
          .string()
          .required('Обязательное поле');

        const customRules = (value) => {
          if (!value) {
            return 'Обязательное поле';
          }

          return '';
        };

        return {
          yupRules,
          customRules,
          PHONE_LOCALES,
        };
      },
      template: `
          <div style="display: flex; flex-direction: column; gap: 20px;">
            <BaseInputPhone
              label="Yup validation"
              name="input_phone_rules_yup"
              placeholder="+7"
              required
              :rules="yupRules"
              itemsPhone="PHONE_LOCALES"
            />
            <BaseInputPhone
              label="Custom validation"
              name="input_phone_rules_custom"
              placeholder="+7"
              required
              :rules="customRules"
              itemsPhone="PHONE_LOCALES"
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
        BaseInputPhone,
      },

      setup() {
        return {
          PHONE_LOCALES,
          validationSchema: yup.object({
            input: yup.string().required('Обязательное поле'),
          }),
        };
      },

      template: `
          <BaseForm
            buttonLabel="Submit"
            title="Input form"
            :validation-schema="validationSchema"
            validateOnMount
          >
            <BaseInputPhone
              label="Input"
              name="input_phone"
              placeholder="+7"
              required
              itemsPhone="PHONE_LOCALES"
            />
          </BaseForm>
        `,
    };
  },
};
