import { action } from '@storybook/addon-actions';
import * as yup from 'yup';
import BaseCalendar from '../BaseCalendar.vue';
import { CALENDAR_TYPES, LANG_VARIANTS } from '../types/calendar';
import { DEFAULT_SIZES } from '~/assets/constants/sizes';
import BaseForm from '~/components/entities/form/BaseForm.vue';

const Template = args => ({
  components: { BaseCalendar },
  setup() {
    return { args };
  },
  methods: {
    clear: action('clear'),
  },
  template: '<BaseCalendar v-bind="args" @clear="clear" />',
});

export default {
  title: '🟡 Micro components/Inputs/Calendar',
  component: BaseCalendar,

  argTypes: {
    disabled: {
      control: 'boolean',
    },

    fromDate: {
      control: 'date',
    },

    id: {
      control: 'text',
    },

    label: {
      control: 'text',
    },

    locale: {
      control: 'select',
      options: LANG_VARIANTS,
    },

    modelValue: {
      control: 'date',
    },

    name: {
      control: 'text',
    },

    placeholder: {
      control: 'text',
    },

    range: {
      control: 'boolean',
    },

    rules: {
      control: 'object',
    },

    size: {
      control: 'select',
      options: DEFAULT_SIZES,
    },

    toDate: {
      control: 'date',
    },

    formatDate: {
      control: 'text',
    },

    type: {
      control: 'select',
      options: CALENDAR_TYPES,
    },
  },

  args: {
    disabled: false,
    fromDate: undefined,
    id: '',
    label: 'Label',
    locale: 'ru',
    name: 'date',
    modelValue: undefined,
    placeholder: 'Placeholder',
    range: false,
    required: false,
    rules: undefined,
    size: 'm',
    toDate: undefined,
    formatDate: 'DD.MM.YYYY',
    type: 'date',
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

export const FormatDate = {
  render: () => {
    return {
      components: {
        BaseCalendar,
      },

      template: '<BaseCalendar name="example" label="formatDate" placeholder="Placeholder" format-date="YYYY-DD-MM" />',
    };
  },
};

export const Sizes = {
  render: () => {
    return {
      components: {
        BaseCalendar,
      },

      setup() {
        return {
          DEFAULT_SIZES,
        };
      },

      template: `
          <div style="display: grid; gap: 60px 40px; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr))">
            <div style="display: flex; flex-direction: column; gap: 24px;">
              <BaseCalendar
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
        BaseCalendar,
      },

      template: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 24px;">
            <BaseCalendar name="example3" label="default" placeholder="Placeholder" />
            <BaseCalendar name="example4" label="disabled" placeholder="Placeholder" disabled />
          </div>
        `,
    };
  },
};

export const Required = {
  render: () => {
    return {
      components: {
        BaseCalendar,
      },

      template: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 24px;">
            <BaseCalendar
              name="example5"
              placeholder="Placeholder"
              label="Label"
              required
            />
            <BaseCalendar
              name="example6"
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

export const Range = {
  render: () => {
    return {
      components: {
        BaseCalendar,
      },

      template: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 24px;">
            <BaseCalendar name="example7" placeholder="Default" />
            <BaseCalendar name="example8" placeholder="Range" range />
          </div>
        `,
    };
  },
};

export const DisabledDate = {
  render: () => {
    return {
      components: {
        BaseCalendar,
      },

      setup() {
        return {
          afterAWeek: new Date(new Date().getTime() + 14 * 24 * 3600 * 1000),
          today: new Date(),
        };
      },

      template: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 24px;">
            <BaseCalendar name="calendar_disabled_date" placeholder="Default" />
            <BaseCalendar
              :from-date="today"
              name="calendar_disabled_date_from_date"
              placeholder="From date"
            />
            <BaseCalendar
              :to-date="today"
              name="calendar_disabled_date_to_date"
              placeholder="To date"
            />
            <BaseCalendar
              :from-date="today"
              name="calendar_disabled_date_from_date_end_to_date"
              placeholder="From date end to date"
              :to-date="afterAWeek"
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
        BaseCalendar,
      },

      setup() {
        return {
          yupRules: yup.string().nullable().required('Обязательное поле'),
          customRules: date => date || 'Обязательное поле',
        };
      },

      template: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 24px;">
            <BaseCalendar
              name="calendar_rules_yup"
              placeholder="Yup validation"
              :rules="yupRules"
            />
            <BaseCalendar
              name="calendar_rules_custom"
              placeholder="Custom validation"
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
        BaseCalendar,
      },

      setup() {
        return {
          validationSchema: yup.object({
            calendar_rules_custom: yup.string().nullable().required('Обязательное поле'),
          }),
        };
      },

      template: `
          <BaseForm
            buttonLabel="Submit"
            title="Calendar form"
            :validation-schema="validationSchema"
            validateOnMount
          >
            <BaseCalendar
              label="Calendar"
              locale="ru"
              name="calendar_rules_custom"
              placeholder="Calendar placeholder"
              required
            />
          </BaseForm>
        `,
    };
  },
};

export const Type = {
  render: () => {
    return {
      components: {
        BaseCalendar,
      },

      setup() {
        return {
          CALENDAR_TYPES,
        };
      },

      template: `
          <div style="display: grid; gap: 60px 40px; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr))">
            <div style="display: flex; flex-direction: column; gap: 24px;">
              <BaseCalendar
                v-for="item in CALENDAR_TYPES"
                :label="'Type: ' + item"
                placeholder="Placeholder"
                :name="item"
                :type="item"
              />
            </div>
          </div>
        `,
    };
  },
};
