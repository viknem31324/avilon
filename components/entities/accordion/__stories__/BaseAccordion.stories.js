import BaseAccordion from '../BaseAccordion.vue';
import BaseAccordionItem from '../BaseAccordionItem.vue';
import items from './mocks/items';

const Template = args => ({
  components: {
    BaseAccordion,
    BaseAccordionItem,
  },
  setup() {
    return {
      args,
      items,
    };
  },
  template: `<BaseAccordion>
    <BaseAccordionItem
      v-for="item in items"
      :key="item.id"
      :title="item.title"
      :button="item.button"
    >
      <div v-html="item.description"></div>
    </BaseAccordionItem>
  </BaseAccordion>`,
});

export default {
  title: '🔵 Macro components/Accordion',
  component: BaseAccordion,

  parameters: {
    layout: 'fullscreen',
  },

  argTypes: {
    id: {
      control: 'text',
    },

    multiple: {
      control: 'boolean',
    },
  },

  args: {
    id: 'accordion',
    multiple: true,
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
