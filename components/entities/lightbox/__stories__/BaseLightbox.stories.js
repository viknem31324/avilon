import BaseLightbox from '../BaseLightbox.vue';
import BaseButton from '~/components/ui/button/BaseButton.vue';

const Template = args => ({
  components: { BaseLightbox },
  setup() {
    return {
      args,
    };
  },
  template: `
    <BaseLightbox v-bind="args" style="position: static;">
      Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus,
      sem quam semper libero.
    </BaseLightbox>
  `,
});

export default {
  title: '🔵 Macro components/Lightbox',
  component: BaseLightbox,

  parameters: {
    layout: 'fullscreen',
  },

  argTypes: {
    title: {
      control: 'text',
    },

    isOpen: {
      control: 'boolean',
    },

    isClosing: {
      control: 'boolean',
    },
  },

  args: {
    title: 'Aenean commodo ligula eget dolor aenean massa',
    isOpen: true,
    isClosing: true,
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
      template: `<div style="height: 100vh;">
          <story />
        </div>`,
    }),
  ],
};

export const Standard = {
  render: () => {
    return {
      components: {
        BaseLightbox,
        BaseButton,
      },

      data() {
        return {
          isOpen: false,
        };
      },

      template: `
          <BaseButton label="Open standard lightbox"  @click="isOpen = true" />
          <BaseLightbox
            title="Aenean commodo ligula eget dolor aenean massa"
            :isOpen="isOpen"
            @confirm="isOpen = false"
            @close="isOpen = false"
          >
            <template v-slot="{close, confirm}">
              Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero.

              <div style="display: flex; gap: 8px; margin-top: 32px;">
                <BaseButton label="Send" variant="accent" icon="chevron-right" @click="confirm" />
                <BaseButton label="Back" variant="primary" icon="chevron-right" @click="close" />
              </div>
            </template>
          </BaseLightbox>`,
    };
  },
};

export const Headline = {
  render: () => {
    return {
      components: {
        BaseLightbox,
        BaseButton,
      },

      data() {
        return {
          isOpen: false,
        };
      },

      template: `
          <BaseButton label="Open headline lightbox" @click="isOpen = true" />
          <BaseLightbox
            title="Aenean commodo ligula eget dolor aenean massa"
            :isOpen="isOpen"
            @confirm="isOpen = false"
            @close="isOpen = false"
          />`,
    };
  },
};

export const Closing = {
  render: () => {
    return {
      components: {
        BaseLightbox,
        BaseButton,
      },

      data() {
        return {
          isOpen: false,
        };
      },

      template: `
          <BaseButton label="Open lightbox" @click="isOpen = true" />
          <BaseLightbox
            title="Aenean commodo ligula eget dolor aenean massa"
            :isOpen="isOpen"
            :is-closing="false"
            @confirm="isOpen = false"
            @close="isOpen = false"
          />`,
    };
  },
};
