import BasePagination from '../BasePagination.vue';
import { PAGINATION_PER_PAGE_OPTIONS } from '../pagination';
import { DEFAULT_SIZES } from '~/assets/constants/sizes';

const Template = args => ({
  components: { BasePagination },
  setup() {
    return {
      args,
    };
  },
  template: '<BasePagination v-bind="args" v-model:currentPage="args.currentPage" v-model:perPage="args.perPage" />',
});

export default {
  title: '🔵 Macro components/Pagination',
  component: BasePagination,

  argTypes: {
    currentPage: {
      control: 'number',
    },

    disabled: {
      control: 'boolean',
    },

    href: {
      control: 'text',
    },

    pageJumperTitle: {
      control: 'text',
    },

    perPage: {
      control: 'number',
    },

    perPageOptions: {
      control: 'object',
    },

    rowsSelectorTitle: {
      control: 'text',
    },

    size: {
      control: 'select',
      options: DEFAULT_SIZES,
    },

    totalPages: {
      control: 'number',
    },
  },

  args: {
    currentPage: 1,
    disabled: false,
    pageJumperTitle: 'Go to',
    perPage: 10,
    perPageOptions: PAGINATION_PER_PAGE_OPTIONS,
    rowsSelectorTitle: 'On page:',
    size: 'm',
    totalPages: 100,
    href: '',
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

export const Href = {
  render: Template.bind(),

  args: {
    currentPage: 1,
    pageJumperTitle: 'Go to',
    perPage: 10,
    perPageOptions: PAGINATION_PER_PAGE_OPTIONS,
    rowsSelectorTitle: 'On page:',
    size: 'm',
    totalPages: 100,
    href: '/?page=',
  },
};
