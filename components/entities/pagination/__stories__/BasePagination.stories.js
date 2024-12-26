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
      control: {
        type: 'number',
      },
    },

    disabled: {
      control: {
        type: 'boolean',
      },
    },

    href: {
      control: {
        type: 'text',
      },
    },

    pageJumperTitle: {
      control: {
        type: 'text',
      },
    },

    perPage: {
      control: {
        type: 'number',
      },
    },

    perPageOptions: {
      control: {
        control: 'object',
      },
    },

    rowsSelectorTitle: {
      control: {
        type: 'text',
      },
    },

    size: {
      control: {
        type: 'select',
      },

      options: DEFAULT_SIZES,
    },

    totalPages: {
      control: {
        type: 'number',
      },
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
