import { action } from '@storybook/addon-actions';
import * as yup from 'yup';
import BaseForm from '../BaseForm.vue';
import { FORM_POSITION, FORM_POSITION_VAL } from '../form';
import BaseCheckbox from '~/components/ui/inputs/BaseCheckbox.vue';
import BaseRadioGroup from '~/components/ui/inputs/BaseRadioGroup.vue';
import BaseSelect from '~/components/ui/inputs/BaseSelect.vue';
import BaseInput from '~/components/ui/inputs/BaseInput.vue';
import BaseTextarea from '~/components/ui/inputs/BaseTextarea.vue';
import { PHONE_RU_REQUIRED_RULE, POLITICS_RULE } from '~/assets/constants/formRules';

const RADIO_GROUP_ITEMS = [
  {
    label: 'Муж',
    value: 'Муж',
  },
  {
    label: 'Жен',
    value: 'Жен',
  },
];

const SELECT_ITEMS = [
  { title: 'Input value', id: '1', description: 'Description' },
  { title: 'Menu item 2', id: '2' },
  { title: 'Bitte wahle', id: '3' },
  { title: 'Menu item 4', id: '4' },
  { title: 'Menu item 5', id: '5', $isDisabled: true },
];

const Template = args => ({
  components: {
    BaseForm,
    BaseCheckbox,
    BaseRadioGroup,
    BaseSelect,
    BaseInput,
    BaseTextarea,
  },
  setup() {
    return {
      args,
      RADIO_GROUP_ITEMS,
      SELECT_ITEMS,
      CHECKBOX_LABEL:
        'Я прочитал и принял условия <a href="#" style="color:#4FC7B5">Публичной оферты</a> и <a href="#" style="color:#4FC7B5">Политики по обработке персональных данных</a> и даю согласие на обработку своих персональных данных',
      validationSchema: yup.object({
        name: yup.string().trim().required('Error message'),
        surname: yup.string().trim().required('Error message'),
        email: yup.string().required('Error message').email('Invalid email'),
        ...PHONE_RU_REQUIRED_RULE,
        ...POLITICS_RULE,
      }),
    };
  },
  methods: {
    submit: action('submit'),
  },
  template: `
    <BaseForm v-bind="args" :validation-schema="validationSchema" @submit="submit">
      <BaseRadioGroup
        :items="RADIO_GROUP_ITEMS"
        model-value="Frau"
        name="input_rules_radio"
      />
      <BaseInput
        label="Name"
        name="name"
        placeholder="Input placeholder"
        required
      />
      <BaseInput
        label="Surname"
        name="surname"
        placeholder="Input placeholder"
        required
      />
      <BaseInput
        label="E-Mail"
        name="email"
        placeholder="Input placeholder"
        required
      />
      <BaseInput
        type="tel"
        label="Phone"
        name="phone"
        placeholder="+7"
        mask="+7(###) ###-##-##"
        required
      />
      <BaseSelect
        :items="SELECT_ITEMS"
        label="Items"
        name="items"
        placeholder="Input placeholder"
      />
      <BaseTextarea
        label="textarea"
        name="textarea"
        placeholder="Input placeholder"
      />
      <BaseCheckbox
        :label="CHECKBOX_LABEL"
        model-value=""
        name="politics"
        value="checkbox"
      />
    </BaseForm>
  `,
});

export default {
  title: '🔵 Macro components/Form',
  component: BaseForm,

  parameters: {
    layout: 'fullscreen',
  },

  argsTypes: {
    backgroundImg: {
      control: 'text',
    },
    buttonDisable: {
      control: 'boolean',
    },
    button: {
      control: 'object',
    },
    description: {
      control: 'text',
    },
    id: {
      control: 'text',
    },
    position: {
      control: 'select',
      options: FORM_POSITION_VAL,
    },
    submitMessage: {
      control: 'object',
    },
    title: {
      control: 'text',
    },
    validationSchema: {
      control: 'object',
    },
  },

  args: {
    backgroundImg: '',
    buttonDisable: false,
    button: {
      icon: 'chevron-right',
      label: 'Отправить',
    },
    description: '',
    id: 'form',
    position: FORM_POSITION.CENTER,
    title: 'Form title',
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

export const Slot = {
  render: () => {
    return {
      components: {
        BaseForm,
        BaseInput,
      },

      setup() {
        return {
          yupRules: yup.string().required('Обязательное поле'),
        };
      },

      template: `
          <div>
            <BaseForm
              description="<b style='color:#000'>Телефон для связи <a href='tel:88005553355' style='color:#E50040;text-decoration:none'>8 800 555 33 55</a></b>"
              title="Не нашли ответ? Свяжитесь с нами"
            >
              <BaseInput
                label="Yup validation"
                name="input_rules_yup"
                placeholder="Input placeholder"
                required
                :rules="yupRules"
              />
            </BaseForm>
          </div>
        `,
    };
  },
};

export const Title = {
  render: () => {
    return {
      components: {
        BaseForm,
        BaseInput,
      },

      template: `
          <div>
            <BaseForm title="Title">
              <BaseInput
                label="Yup validation"
                name="input_rules_yup"
                placeholder="Input placeholder"
              />
            </BaseForm>
          </div>
        `,
    };
  },
};

export const Button = {
  render: () => {
    return {
      components: {
        BaseForm,
        BaseInput,
      },

      template: `
          <div>
            <BaseForm
              :button="{ icon: 'chevron-double-left', label: 'Submit' }"
              title="Title"
            >
              <BaseInput
                label="Yup validation"
                name="input_rules_yup"
                placeholder="Input placeholder"
              />
            </BaseForm>
          </div>
        `,
    };
  },
};

export const ButtonDisable = {
  render: () => {
    return {
      components: {
        BaseForm,
        BaseInput,
      },

      template: `
          <div>
            <BaseForm title="Title" button-disable>
              <BaseInput
                label="Yup validation"
                name="input_rules_yup"
                placeholder="Input placeholder"
              />
            </BaseForm>
          </div>
        `,
    };
  },
};

export const Description = {
  render: () => {
    return {
      components: {
        BaseForm,
        BaseInput,
      },

      template: `
          <div>
            <BaseForm
              description="Description"
              title="Title"
            >
              <BaseInput
                label="Yup validation"
                name="input_rules_yup"
                placeholder="Input placeholder"
              />
            </BaseForm>
          </div>
        `,
    };
  },
};

export const ValidationSchema = {
  render: () => {
    return {
      components: {
        BaseForm,
        BaseInput,
      },

      setup() {
        return {
          validationSchema: yup.object({
            input_name: yup.string().trim().required('Обязательное поле'),
          }),
        };
      },

      template: `
          <div>
            <BaseForm
              title="Validation shema"
              :validation-schema="validationSchema"
            >
              <BaseInput
                label="Yup validation"
                name="input_name"
                placeholder="Input placeholder"
                required
              />
            </BaseForm>
          </div>
        `,
    };
  },
};
