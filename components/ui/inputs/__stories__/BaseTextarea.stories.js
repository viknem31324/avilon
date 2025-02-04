import { action } from '@storybook/addon-actions';
import * as yup from 'yup';
import BaseTextarea from '../BaseTextarea.vue';
import { DEFAULT_SIZES } from '~/assets/constants/sizes';
import BaseForm from '~/components/entities/form/BaseForm.vue';

const Template = args => ({
  components: { BaseTextarea },
  setup() {
    return { args };
  },
  methods: {
    blur: action('blur'),
    focus: action('focus'),
    input: action('input'),
  },
  template:
    '<BaseTextarea v-bind="args" @blur="blur" @focus="focus" @update:modelValue="input" />',
});

export default {
  title: '🟡 Micro components/Inputs/Textarea',
  component: BaseTextarea,

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
  },

  args: {
    disabled: false,
    errorText: '',
    id: '',
    label: 'Label',
    modelValue: '',
    name: 'textarea',
    placeholder: 'Placeholder',
    required: false,
    rules: undefined,
    size: 'm',
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
        BaseTextarea,
      },

      setup() {
        return {
          DEFAULT_SIZES,
        };
      },

      template: `
          <div style="display: grid; gap: 60px 40px; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr))">
            <div style="display: flex; flex-direction: column; gap: 24px;">
              <BaseTextarea
                v-for="size in DEFAULT_SIZES"
                :label="'Size: ' + size"
                placeholder="Placeholder"
                :name="size"
                :size="size"
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
        BaseTextarea,
      },

      template: `
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
            <BaseTextarea name="textareu_states_1" placeholder="Placeholder" />
            <BaseTextarea name="textarea_states_2" placeholder="Placeholder" modelValue="Default" />
            <BaseTextarea name="textarea_states_3" placeholder="Placeholder disabled" disabled />
            <BaseTextarea name="textarea_states_4" placeholder="Placeholder" modelValue="Disabled" disabled />
          </div>
        `,
    };
  },
};

export const Required = {
  render: () => {
    return {
      components: {
        BaseTextarea,
      },

      template: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 24px;">
            <BaseTextarea
              name="textarea_required_1"
              placeholder="Placeholder"
              label="Label"
              required
            />
            <BaseTextarea
              name="textarea_required_2"
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

export const MaxLength = {
  render: () => {
    return {
      components: {
        BaseTextarea,
      },

      template: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 24px;">
            <BaseTextarea
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
        BaseTextarea,
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
            <BaseTextarea
              label="Yup validation"
              name="textarea_rules_yup"
              placeholder="Textarea placeholder"
              required
              :rules="yupRules"
            />
            <BaseTextarea
              label="Custom validation"
              name="textarea_rules_custom"
              placeholder="Textarea placeholder"
              required
              :rules="customRules"
            />
            <BaseTextarea
              label="Validation when removing focus"
              name="textarea_rules_custom_removing_focus"
              placeholder="Textarea placeholder"
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
        BaseTextarea,
      },

      setup() {
        return {
          validationSchema: yup.object({
            textarea: yup.string().required('Обязательное поле'),
          }),
        };
      },

      template: `
          <BaseForm
            buttonLabel="Submit"
            :items="items"
            title="Textarea form"
            :validation-schema="validationSchema"
            validateOnMount
          >
            <BaseTextarea
              label="Textarea"
              name="textarea"
              placeholder="Textarea placeholder"
              required
            />
          </BaseForm>
        `,
    };
  },
};
