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
    modelValue: {
      control: 'text',
    },
    locale: {
      control: 'text',
    },
    name: {
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
    localesPhone: {
      control: 'object',
    },
  },

  args: {
    disabled: false,
    errorText: '',
    id: '',
    modelValue: '',
    name: 'input_phone',
    required: false,
    rules: undefined,
    size: 'm',
    locale: 'ru',
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
                :name="inputPhoneSize"
                :size="inputPhoneSize"
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
            />
            <BaseInputPhone
              name="input_phone_states_2"
              modelValue="987 995 55 55"
            />
            <BaseInputPhone
              name="input_phone_states_3"
              disabled
            />
            <BaseInputPhone
              name="input_phone_states_4"
              modelValue="987 995 55 55"
              disabled
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
              required
            />
            <BaseInputPhone
              name="input_phone_required_2"
              disabled
              required
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
              :locale="index === 0 ? 'ru' : 'by'"
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
              name="input_phone_rules_yup"
              required
              :rules="yupRules"
            />
            <BaseInputPhone
              name="input_phone_rules_custom"
              required
              :rules="customRules"
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
              name="input_phone"
              required
            />
          </BaseForm>
        `,
    };
  },
};
