import * as yup from 'yup';
import BaseInputFileUpload from '../BaseInputFileUpload.vue';
import { ICONS } from '../../icon/icon';
import BaseForm from '~/components/entities/form/BaseForm.vue';

const Template = args => ({
  components: { BaseInputFileUpload },
  setup() {
    return { args };
  },
  template: '<BaseInputFileUpload v-bind="args" />',
});

export default {
  title: '🟡 Micro components/Inputs/Input File Upload',
  component: BaseInputFileUpload,

  argTypes: {
    accept: {
      control: 'text',
    },

    name: {
      control: 'text',
    },

    title: {
      control: 'text',
    },

    formatsText: {
      control: 'text',
    },

    icon: {
      control: 'select',
      options: ICONS,
    },

    buttonText: {
      control: 'text',
    },

    rules: {
      control: 'object',
    },

    img: {
      control: 'text',
    },
  },

  args: {
    accept: '',
    name: 'input_file_upload',
    title: 'Выберите файл',
    formatsText: '.jpg',
    icon: 'file',
    buttonText: 'Загрузить',
    rules: undefined,
    img: 'https://gb.ru/blog/wp-content/uploads/2022/11/1-17.jpg.webp',
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

export const Rules = {
  render: () => {
    return {
      components: {
        BaseInputFileUpload,
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
          .required('Обязательное поле');

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
            <BaseInputFileUpload
              name="input_file_upload_rules"
              title="Выберите файл"
              formatsText=".jpg"
              icon="file"
              buttonText="Загрузить"
              img="https://gb.ru/blog/wp-content/uploads/2022/11/1-17.jpg.webp"
              :rules="yupRules"
            />
        `,
    };
  },
};

export const Error = {
  render: () => {
    return {
      components: {
        BaseForm,
        BaseInputFileUpload,
      },

      setup() {
        return {
          validationSchema: yup.object({
            input_file_upload_error: yup.string().required('Обязательное поле'),
          }),
        };
      },

      template: `
          <BaseForm
            buttonLabel="Submit"
            title="Input file upload form"
            :validation-schema="validationSchema"
            validateOnMount
          >
            <BaseInputFileUpload
              name="input_file_upload_error"
              title="Выберите файл"
              formatsText=".jpg"
              icon="file"
              buttonText="Загрузить"
            />
          </BaseForm>
        `,
    };
  },
};
