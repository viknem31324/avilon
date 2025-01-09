import { createRobots } from './utils/createRobots';

const isProduction = process.env.URL === 'prod URL';
const isDevelopMode = typeof process !== 'undefined' && process.env.NODE_ENV === 'development';
// const isGenerateMode = typeof process !== 'undefined' && process?.argv?.includes('generate');

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/apollo',
    '@nuxt/eslint',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-delay-hydration',
  ],

  components: [
    {
      path: '@/components',
      pathPrefix: false,
    },
    {
      path: '@/components/entities',
      pathPrefix: false,
    },
    {
      path: '@/components/modules',
      pathPrefix: false,
    },
    {
      path: '@/components/shared',
      pathPrefix: false,
    },
    {
      path: '@/components/ui',
      pathPrefix: false,
    },
    {
      path: '@/components/widgets',
      pathPrefix: false,
    },
  ],

  devtools: { enabled: isDevelopMode },

  app: {
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
      title: 'Title',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'title', content: 'Title' },
        { hid: 'description', name: 'description', content: 'Description' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  css: ['@/assets/scss/index.scss'],

  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => tag.startsWith('swiper-'),
    },
  },

  // vpn https://nuxtseo.com/sitemap/getting-started/installation
  site: {
    url: process.env.VITE_URL || '',
    trailingSlash: true,
  },

  runtimeConfig: {
    public: {
      isProduction,
      url: process.env.VITE_URL || '',
    },
  },
  compatibilityDate: '2024-12-11',

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: '@use "@/assets/scss/helpers/index.scss" as *;',
        },
      },
    },
  },

  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.VITE_API_URL || '',
        httpLinkOptions: {
          headers: {
            authorization: `Bearer ${process.env.AUTHORIZATION_TOKEN}`,
          },
        },
        // or
        // tokenName: 'YOUR_TOKEN',
        // tokenStorage: 'cookie', // localStorage
        authType: 'Bearer',
        authHeader: 'Authorization',
      },
    },
  },

  // https://nuxt.com/modules/delay-hydration
  delayHydration: {
    mode: 'init',
    debug: isDevelopMode,
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  robots: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    rules: createRobots(isProduction),
  },
});
