import ModuleAnchorMenu from '../ModuleAnchorMenu.vue';
import AppContainer from '~/components/ui/AppContainer.vue';

const Template = args => ({
  components: { ModuleAnchorMenu },
  setup() {
    return { args };
  },
  template: '<ModuleAnchorMenu v-bind="args" />',
});

export default {
  title: '🟣 Site components/Anchor Menu',
  component: ModuleAnchorMenu,

  parameters: {
    layout: 'fullscreen',
  },

  argTypes: {
    items: {
      control: 'object',
    },
  },

  args: {
    items: [
      {
        text: 'Заголовок 1',
        href: '#заголовок1',
      },
      {
        text: 'Заголовок 2',
        href: '#заголовок2',
      },
      {
        text: 'Заголовок 3',
        href: '#заголовок3',
      },
      {
        text: 'Заголовок 4',
        href: '#заголовок4',
      },
      {
        text: 'Заголовок 5',
        href: '#заголовок5',
      },
      {
        text: 'Заголовок 6',
        href: '#заголовок6',
      },
      {
        text: 'Заголовок 7',
        href: '#заголовок7',
      },
      {
        text: 'Заголовок 8',
        href: '#заголовок8',
      },
      {
        text: 'Заголовок 9',
        href: '#заголовок9',
      },
    ],
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

export const Example = {
  render: (args) => {
    return {
      components: {
        ModuleAnchorMenu,
        AppContainer,
      },

      setup() {
        return {
          args,
        };
      },

      template: `
              <div>
                <ModuleAnchorMenu :items="args.items" />
                <AppContainer>
                  <section id="заголовок1" style="margin-top: 30px;">Заголовок 1</section>
                  <section id="заголовок2" style="margin-top: 500px;">Заголовок 2</section>
                  <section id="заголовок3" style="margin-top: 546px;">Заголовок 3</section>
                  <section id="заголовок4" style="margin-top: 146px; padding: 40px 0;">Заголовок 4</section>
                  <section id="заголовок5" style="margin-top: 350px;">Заголовок 5</section>
                  <section id="заголовок6" style="margin-top: 1900px;">Заголовок 6</section>
                  <section id="заголовок7" style="margin-top: 2300px, padding-bottom: '900px';">Заголовок 7</section>
                  <section id="заголовок8" style="margin-top: 1900px;">Заголовок 8</section>
                  <section id="заголовок9" style="margin-top: 2300px; padding-bottom: 900px">Заголовок 9</section>
                </AppContainer>
            </div>`,
    };
  },
};
