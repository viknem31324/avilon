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
        text: 'Описание',
        href: '#описание-overview',
      },
      {
        text: 'Область применения',
        href: '#область-overview',
      },
      {
        text: 'Характеристики',
        href: '#характеристики-overview',
      },
      {
        text: 'Особенности',
        href: '#особенности-overview',
      },
      {
        text: 'RAUTUBE®',
        href: '#rautube-overview',
        tag: 'NEW',
      },
      {
        text: 'Установка',
        href: '#установка-overview',
      },
      {
        text: 'Заголовок 1',
        href: '#заголовок1-overview',
      },
      {
        text: 'Заголовок 2',
        href: '#заголовок2-overview',
      },
      {
        text: 'Заголовок 3',
        href: '#заголовок3-overview',
      },
      {
        text: 'Заголовок 4',
        href: '#заголовок4-overview',
      },
      {
        text: 'Заголовок 5',
        href: '#заголовок5-overview',
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
  render: () => {
    return {
      components: {
        ModuleAnchorMenu,
        AppContainer,
      },

      template: `
              <div>
                <ModuleAnchorMenu :items="[
                  {text: 'Описание', href: '#описание'},
                  {text: 'Область применения', href: '#область-применения'},
                  {text: 'Характеристики', href: '#характеристики'},
                  {text: 'Особенности', href: '#особенности'},
                  {text: 'RAUTUBE®', href: '#rautube', tag: 'NEW'},
                  {text: 'Установка', href: '#установка'},
                  {text: 'Портфолио', href: '#портфолио'},
                ]" />
                <AppContainer>
                  <section id="описание" style="margin-top: 30px;">Описание</section>
                  <section id="область-применения" style="margin-top: 500px;">Область применения</section>
                  <section id="характеристики" style="margin-top: 546px;">Характеристики</section>
                  <section id="особенности" style="margin-top: 146px; padding: 40px 0">Особенности</section>
                  <section id="rautube" style="margin-top: 350px;">RAUTUBE®</section>
                  <section id="установка" style="margin-top: 1900px;">Установка</section>
                  <section id="портфолио" style="margin-top: 2300px; padding-bottom: 900px;">Портфолио</section>
                </AppContainer>
            </div>`,
    };
  },
};
