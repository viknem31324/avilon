const isProduction = process.env.URL === 'prod URL';
const isDevelopMode = typeof process !== 'undefined' && process.env.NODE_ENV === 'development';
// const isGenerateMode = typeof process !== 'undefined' && process?.argv?.includes('generate');

const baseURL = '/avilon/';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/apollo',
    '@nuxt/eslint',
    'nuxt-delay-hydration',
  ],

  ssr: true,

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

  app: {
    baseURL,
    buildAssetsDir: '/_nuxt/',
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
      title: 'АВИЛОН TANK Официальный дилер TANK в Москве © 2025',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'title', content: 'АВИЛОН TANK Официальный дилер TANK в Москве © 2025' },
        { hid: 'description', name: 'description', content: 'АВИЛОН TANK Официальный дилер TANK в Москве © 2025' },
      ],
      link: [
        { rel: 'icon', type: 'image/webp', href: `${baseURL}favicon.webp` },
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

  generate: {
    routes: [
      '/',
    ],
  },

  experimental: {
    payloadExtraction: true,
  },

  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true, // Автоматически находит ссылки
      routes: ['/'],
      failOnError: false, // Не падать при ошибках
    },
  },

  vite: {
    base: baseURL,
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

  target: 'static',
});
