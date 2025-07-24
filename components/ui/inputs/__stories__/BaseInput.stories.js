import { action } from '@storybook/addon-actions';
import * as yup from 'yup';
import BaseInput from '../BaseInput.vue';
import { INPUT_TYPES } from '../types/input';
import { DEFAULT_SIZES } from '~/assets/constants/sizes';
import BaseForm from '~/components/entities/form/BaseForm.vue';

const Template = args => ({
  components: { BaseInput },
  setup() {
    return { args };
  },
  methods: {
    blur: action('blur'),
    focus: action('focus'),
    input: action('input'),
  },
  template:
    '<BaseInput v-bind="args" @blur="blur" @focus="focus" @update:modelValue="input" />',
});

export default {
  title: '🟡 Micro components/Inputs/Input',
  component: BaseInput,

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
    maxLength: {
      control: 'number',
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
    type: {
      control: 'select',
      options: INPUT_TYPES,
    },
    mask: {
      control: 'text',
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
    type: 'text',
    mask: '',
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
        BaseInput,
      },

      setup() {
        return {
          DEFAULT_SIZES,
        };
      },

      template: `
          <div style="display: grid; gap: 60px 40px; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr))">
            <div style="display: flex; flex-direction: column; gap: 24px;">
              <BaseInput
                v-for="inputSize in DEFAULT_SIZES"
                label="Label"
                placeholder="Placeholder"
                :name="inputSize"
                :size="inputSize"
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
        BaseInput,
      },

      template: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 24px;">
            <BaseInput name="input_states_1" placeholder="Placeholder" />
            <BaseInput name="input_states_2" placeholder="Placeholder" modelValue="Default" />
            <BaseInput name="input_states_3" placeholder="Placeholder" disabled />
            <BaseInput name="input_states_4" placeholder="Placeholder" modelValue="Disabled" disabled />
          </div>
        `,
    };
  },
};

export const Required = {
  render: () => {
    return {
      components: {
        BaseInput,
      },

      template: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 24px;">
            <BaseInput
              name="input_required_1"
              placeholder="Placeholder"
              label="Label"
              required
            />
            <BaseInput
              name="input_required_2"
              disabled
              placeholder="Placeholder"
              label="Label"
              required
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
        BaseInput,
      },

      template: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 24px;">
            <BaseInput
              name="Mask"
              placeholder="+7"
              label="Label"
              type="tel"
              mask="+7(###) ###-##-##"
            />
            <BaseInput
              name="MaskBy"
              placeholder="+375"
              label="Label"
              type="tel"
              mask="+375(##) ###-##-##"
            />
          </div>
        `,
    };
  },
};

export const MaxLength = {
  render: () => {
    return {
      components: {
        BaseInput,
      },

      template: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 24px;">
            <BaseInput
              name="MaxLength"
              placeholder="Максимальное число символов 10"
              label="MaxLength"
              :max-length="10"
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
        BaseInput,
      },
      data() {
        return {
          errorText: '',
        };
      },
      setup() {
        const SPACE_ERROR_MESSAGE = 'В начале и конце текста не должно быть пробелов';
        const CHARACTERS_ERROR_MESSAGE = 'Текст должен содержать только символы кириллицы и латиницы';
        const LENGTH_ERROR_MESSAGE = 'Число символов должно быть меньше 10';

        const CHARACTERS_REGEXP = /^[А-Яа-яЁёA-Za-z\s]+$/;

        const checkSpaceError = (value) => {
          return !/^[ \s]+|[ \s]+$/.test(value || '');
        };

        const yupRules = yup
          .string()
          .required('Обязательное поле')
          .test('err', SPACE_ERROR_MESSAGE, checkSpaceError)
          .matches(CHARACTERS_REGEXP, {
            message: CHARACTERS_ERROR_MESSAGE,
            excludeEmptyString: true,
          })
          .max(10, LENGTH_ERROR_MESSAGE);

        const customRules = (value) => {
          if (!value) {
            return 'Обязательное поле';
          }

          if (!checkSpaceError(value)) {
            return SPACE_ERROR_MESSAGE;
          }

          if (!CHARACTERS_REGEXP.test(value)) {
            return CHARACTERS_ERROR_MESSAGE;
          }

          if (value.length > 10) {
            return LENGTH_ERROR_MESSAGE;
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
            <BaseInput
              label="Yup validation"
              name="input_rules_yup"
              placeholder="Input placeholder"
              required
              :rules="yupRules"
            />
            <BaseInput
              label="Custom validation"
              name="input_rules_custom"
              placeholder="Input placeholder"
              required
              :rules="customRules"
            />
            <BaseInput
              label="Validation when removing focus"
              name="input_rules_custom_removing_focus"
              placeholder="Input placeholder"
              required
              :error-text="errorText"
              @blur="(evt) => { errorText = customRules(evt.target.value); }"
              @focus="errorText = ''"
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
        BaseInput,
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
            title="Input form"
            :validation-schema="validationSchema"
            validateOnMount
          >
            <BaseInput
              label="Input"
              name="input"
              placeholder="Input placeholder"
              required
            />
          </BaseForm>
        `,
    };
  },
};
