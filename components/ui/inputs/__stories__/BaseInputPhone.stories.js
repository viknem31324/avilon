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
    localesPhone: {
      control: 'object',
    },
  },

  args: {
    disabled: false,
    errorText: '',
    id: '',
    label: 'Label',
    modelValue: '',
    name: 'input_phone',
    placeholder: '+7',
    required: false,
    rules: undefined,
    size: 'm',
    mask: '',
    localesPhone: PHONE_LOCALES,
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
        };
      },

      template: `
          <div style="display: grid; gap: 60px 40px; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr))">
            <div style="display: flex; flex-direction: column; gap: 24px;">
              <BaseInputPhone
                v-for="inputPhoneSize in DEFAULT_SIZES"
                label="Label"
                :name="inputPhoneSize"
                :size="inputPhoneSize"
                placeholder="+7"
                mask="+7 (###) ###-##-##"
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

      template: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 24px;">
            <BaseInputPhone
              name="input_phone_states_1"
              placeholder="+7"
              mask="+7 (###) ###-##-##"
            />
            <BaseInputPhone
              name="input_phone_states_2"
              modelValue="987 995 55 55"
              placeholder="+7"
              mask="+7 (###) ###-##-##"
            />
            <BaseInputPhone
              name="input_phone_states_3"
              disabled
              placeholder="+7"
              mask="+7 (###) ###-##-##"
            />
            <BaseInputPhone
              name="input_phone_states_4"
              modelValue="987 995 55 55"
              disabled
              placeholder="+7"
              mask="+7 (###) ###-##-##"
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

      template: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 24px;">
            <BaseInputPhone
              name="input_phone_required_1"
              label="Label"
              required
              placeholder="+7"
              mask="+7 (###) ###-##-##"
            />
            <BaseInputPhone
              name="input_phone_required_2"
              disabled
              label="Label"
              required
              placeholder="+7"
              mask="+7 (###) ###-##-##"
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

      template: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 24px;">
            <BaseInputPhone
              name="Mask"
              label="Label"
              placeholder="+7"
              mask="+7 (###) ###-##-##"
            />
            <BaseInputPhone
              name="MaskBy"
              label="Label"
              placeholder="+7"
              mask="+7 (###) ###-##-##"
            />
          </div>
        `,
    };
  },
};

export const Locales = {
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
              v-for="(inputPhoneLocale, index) in PHONE_LOCALES"
              v-bind="inputPhoneLocale"
              name="input_phone"
              label="Label"
              :locale="index === 0 ? 'ru' : 'be'"
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
        };
      },
      template: `
          <div style="display: flex; flex-direction: column; gap: 20px;">
            <BaseInputPhone
              label="Yup validation"
              name="input_phone_rules_yup"
              required
              :rules="yupRules"
              placeholder="+7"
              mask="+7 (###) ###-##-##"
            />
            <BaseInputPhone
              label="Custom validation"
              name="input_phone_rules_custom"
              required
              :rules="customRules"
              placeholder="+7"
              mask="+7 (###) ###-##-##"
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
          validationSchema: yup.object({
            input: yup.string().required('Обязательное поле'),
          }),
        };
      },

      template: `
          <BaseForm
            buttonLabel="Submit"
            title="InputPhone form"
            :validation-schema="validationSchema"
            validateOnMount
          >
            <BaseInputPhone
              label="Input"
              name="input_phone"
              required
              placeholder="+7"
              mask="+7 (###) ###-##-##"
            />
          </BaseForm>
        `,
    };
  },
};
