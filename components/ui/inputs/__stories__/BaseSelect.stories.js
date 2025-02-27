import { action } from '@storybook/addon-actions';
import * as yup from 'yup';
import BaseSelect from '../BaseSelect.vue';
import { DEFAULT_SIZES } from '~/assets/constants/sizes';
import BaseForm from '~/components/entities/form/BaseForm.vue';

const Template = args => ({
  components: { BaseSelect },
  setup() {
    return { args };
  },
  methods: {
    close: action('close'),
    open: action('open'),
    searchChange: action('searchChange'),
    select: action('select'),
    updateModelValue: action('update:model-value'),
  },
  template: `
    <BaseSelect
      v-bind="args"
      @close="close"
      @open="open"
      @search-change="searchChange"
      @select="select"
      @update:model-value="updateModelValue"
    >
      <template #singleLabel="option">
        {{ args.singleLabel }} {{ option.title }}
      </template>
      <template v-if="args.option" #option="option">
        {{ args.option }} {{ option.title }}
      </template>
    </BaseSelect>
  `,
});

export default {
  title: '🟡 Micro components/Inputs/Select',
  component: BaseSelect,

  argTypes: {
    allowEmpty: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    errorText: {
      control: 'text',
    },
    hideButton: {
      control: 'boolean',
    },
    id: {
      control: 'text',
    },
    items: {
      control: 'object',
    },
    label: {
      control: 'text',
    },
    modelValue: {
      control: 'text',
    },
    multiselect: {
      control: 'boolean',
    },
    name: {
      control: 'text',
    },
    outerSearch: {
      control: 'boolean',
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
    searchable: {
      control: 'boolean',
    },
  },

  args: {
    allowEmpty: true,
    disabled: false,
    errorText: '',
    hideButton: false,
    id: '',
    items: [
      {
        title: 'Menu item 1',
        id: '1',
        description: 'Description',
      },
      {
        title: 'Menu item 2',
        id: '2',
      },
      {
        title: 'Menu item 3',
        id: '3',
      },
      {
        title: 'Menu item 4',
        id: '4',
      },
      {
        title: 'Menu item 5',
        id: '5',
        $isDisabled: true,
      },
    ],
    label: 'Label',
    modelValue: '',
    multiselect: false,
    name: 'select',
    option: '',
    outerSearch: false,
    placeholder: 'Input placeholder',
    required: false,
    rules: undefined,
    searchable: true,
    size: 'm',
    singleLabel: '',
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

  decorators: [
    () => ({
      template: '<div style="height: 370px;"><story /></div>',
    }),
  ],
};

export const Items = {
  render: () => {
    return {
      components: {
        BaseSelect,
      },

      template: `
          <div style="height: 200px;">
            <BaseSelect
              :items="[
                 { title: 'Title 1', id: '1' },
                 { title: 'Title 2', description: 'Description', id: '2' },
              ]"
              name="select_items"
              placeholder="Input placeholder"
            />
          </div>
        `,
    };
  },

};

export const Label = {
  render: () => {
    return {
      components: {
        BaseSelect,
      },

      template: `
          <div style="height: 228px;">
            <BaseSelect
              :items="[
                 { title: 'Title 1', id: '1' },
                 { title: 'Title 2', description: 'Description', id: '2' },
              ]"
              label="Label"
              name="select_label"
              placeholder="Input placeholder"
            />
          </div>
        `,
    };
  },
};

export const Size = {
  render: () => {
    return {
      components: {
        BaseSelect,
      },

      setup() {
        return {
          DEFAULT_SIZES,
        };
      },

      template: `
          <div style="display: flex; flex-direction: column; gap: 20px; height: 416px;">
            <BaseSelect
              v-for="selectSize in DEFAULT_SIZES"
              :items="[
                 { title: 'Title 1', id: '1' },
                 { title: 'Title 2', description: 'Description', id: '2' },
              ]"
              label="Label"
              :name="selectSize"
              placeholder="Input placeholder"
              :size="selectSize"
            />
          </div>
        `,
    };
  },
};

export const Disabled = {
  render: () => {
    return {
      components: {
        BaseSelect,
      },

      template: `
          <div>
            <BaseSelect
              disabled
              :items="[
                  { title: 'Menu item 1', id: '1' },
                  { title: 'Menu item 2', id: '2' },
              ]"
              label="Label"
              name="select_disabled"
              placeholder="Input placeholder"
            />
            <BaseSelect
              :items="[
                  { title: 'Menu item 1', id: '1' },
                  { title: 'Menu item 2', id: '2' },
              ]"
              disabled
              modelValue="2"
              name="select_disabled_default_value"
              label="Label"
              placeholder="Input placeholder"
            />
          </div>
        `,
    };
  },

};

export const Multiselect = {
  render: () => {
    return {
      components: {
        BaseSelect,
      },

      setup() {
        return {
          modelValue: ['1'],
        };
      },

      template: `
          <div style="display: flex; flex-direction: column; gap: 24px; height: 270px;">
            <BaseSelect
              :items="[
                  { title: 'Menu item 1', id: '1' },
                  { title: 'Menu item 2', id: '2' },
              ]"
              name="select_multiselect"
              label="Label"
              placeholder="Input placeholder"
              multiselect
            />
            <BaseSelect
              :items="[
                  { title: 'Menu item 1', id: '1' },
                  { title: 'Menu item 2', id: '2' },
              ]"
              name="select_multiselect"
              label="Label"
              placeholder="Input placeholder"
              :model-value="modelValue"
              multiselect
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
        BaseSelect,
      },
      setup() {
        const yupRules = yup.string()
          .required('Обязательное поле')
          .test('err', 'Недопустимое значение', value => value !== '1');

        const customRules = (value) => {
          if (!value) {
            return 'Обязательное поле';
          }

          if (value === '1') {
            return 'Недопустимое значение';
          }

          return '';
        };

        return {
          yupRules,
          customRules,
        };
      },

      template: `
          <div style="display: flex; flex-direction: column; gap: 20px; height: 416px;">
            <BaseSelect
              :items="[
                  { title: 'Menu item 1', id: '1' },
                  { title: 'Menu item 2', id: '2' },
              ]"
              name="select_rules_yup"
              label="Yup validation"
              placeholder="Select placeholder"
              :rules="yupRules"
            />
            <BaseSelect
              :items="[
                  { title: 'Menu item 1', id: '1' },
                  { title: 'Menu item 2', id: '2' },
              ]"
              name="select_rules_custom"
              label="Custom validation"
              placeholder="Select placeholder"
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
        BaseSelect,
      },

      setup() {
        return {
          validationSchema: yup.object({
            select: yup.string().required('Обязательное поле'),
          }),
        };
      },

      template: `
          <div>
            <BaseForm
              buttonLabel="Submit"
              title="Select form"
              :validation-schema="validationSchema"
              validateOnMount
            >
              <BaseSelect
                :items="[
                  { title: 'Menu item 1', id: '1', description: 'Description' },
                  { title: 'Menu item 2', id: '2' },
                  { title: 'Bitte wahle', id: '3' },
                  { title: 'Menu item 4', id: '4' },
                ]"
                name="select"
                label="Select"
                placeholder="Select placeholder"
              />
            </BaseForm>
          </div>
        `,
    };
  },

};

export const OuterSearch = {
  render: () => {
    return {
      components: {
        BaseSelect,
      },

      data() {
        return {
          value: null,
          items: [
            {
              id: '1',
              title: 'Item 1 from query',
            },
            {
              id: '2',
              title: 'Item 2 from query',
            },
            {
              id: '3',
              title: 'Find me',
            },
            {
              id: '4',
              title: 'Look better',
            },
          ],
          searchItems: [],
        };
      },

      methods: {
        searchData(query) {
          this.searchItems = query
            ? this.items.filter(({ title }) => title.includes(query))
            : [];
        },
      },

      template: `
          <div style="height: 270px;">
            <BaseSelect
              v-model="value"
              :items="searchItems"
              :outer-search="true"
              name="select-outer-search"
              label="Outer search"
              placeholder="Введите поисковый запрос"
              hide-button
              @search-change="searchData"
            />
          </div>
        `,
    };
  },
};
