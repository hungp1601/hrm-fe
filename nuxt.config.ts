import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // exp
  experimental: {
    localLayerAliases: true,
  },

  // app config
  app: {
    // global transition
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  runtimeConfig: {
    public: {
      baseApiUrl: 'https://api.stg.weekly.vn',
      nodeEnv: 'development',
      port: 4000,
      appPort: 4001,
    },
  },

  // modules
  modules: [
    // chore
    '@nuxtjs/eslint-module',
    // styling & ui
    '@nuxtjs/tailwindcss',
    'nuxt-headlessui',
    'nuxt-icon',
    '@nuxtjs/color-mode',
    // management
    '@pinia/nuxt',
    '@vueuse/nuxt',
    // contents,
    '@element-plus/nuxt',
    'nuxt-bootstrap-icons',
    '@nuxtjs/svg-sprite',
    'dayjs-nuxt',
    'nuxt-lodash',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Roboto: true,
          Helvetica: true,
        },
      },
    ],
  ],

  lodash: {
    prefix: '',
    upperAfterPrefix: false,
  },

  css: [
    resolve('./assets/scss/_variables.scss'),
    resolve('./assets/scss/_layout.scss'),
    resolve('./assets/scss/app.scss'),
    'vue-toast-notification/dist/theme-default.css',
  ],

  components: [
    {
      prefix: 'Layout',
      path: resolve('./components/layouts'),
      global: true,
    },
    {
      prefix: 'Awesome',
      path: resolve('./components/awesome'),
      global: true,
    },
    {
      pathPrefix: false,
      path: resolve('./components/common'),
      global: true,
    },
  ],

  imports: {
    dirs: [
      resolve('./stores'),
      '@/stores', // Scan top-level modules
      'composables',
      // ... or scan modules nested one level deep with a specific name and file extension
      'composables/*/index.{ts,js,mjs,mts}',
      // ... or scan all modules within given directory
      'composables/**',
    ],
  },

  // module::pinia
  pinia: {
    storesDirs: ['~/stores/**', '#/stores/**', '@/stores/**'],
  },

  // lodash: {
  //   prefix: '_',
  //   upperAfterPrefix: false,
  //   alias: [],
  // },

  // module::headlessui
  headlessui: {
    prefix: 'Headless',
  },

  // module::color-mode
  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light',
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "../assets/scss/element/index.scss" as element;`,
        },
      },
    },
  },

  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'scss',
    // themes: ['light'],
  },
})
