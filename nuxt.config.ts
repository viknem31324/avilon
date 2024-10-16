const isProduction = process.env.URL === 'prod URL';
const isDevelopMode = typeof process !== 'undefined' && process.env.NODE_ENV === 'development';
// const isGenerateMode = typeof process !== 'undefined' && process?.argv?.includes('generate');

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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

  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.API_URL || '',
        httpLinkOptions: {
          headers: {
            authorization: `Bearer ${process.env.AUTHORIZATION_TOKEN}`,
          },
        },
        authType: 'Bearer',
        authHeader: 'Authorization',
      },
    },
  },

  components: [
    '@/components',
    '@/components/entities',
    '@/components/modules',
    '@/components/ui',
    '@/components/widgets',
  ],

  css: ['@/assets/scss/index.scss'],

  eslint: {
    config: {
      stylistic: true,
    },
  },

  // https://nuxt.com/modules/delay-hydration
  delayHydration: {
    mode: 'init',
    debug: isDevelopMode,
  },

  devtools: { enabled: isDevelopMode },

  modules: [
    '@nuxtjs/apollo',
    '@nuxt/eslint',
    '@nuxtjs/sitemap',
    'nuxt-delay-hydration',
  ],

  runtimeConfig: {
    public: {
      isProduction,
      url: process.env.URL || '',
    },
  },

  // https://nuxtseo.com/sitemap/getting-started/installation
  site: {
    url: process.env.URL || '',
    trailingSlash: true,
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/helpers/index.scss" as *;',
        },
      },
    },
  },
});
