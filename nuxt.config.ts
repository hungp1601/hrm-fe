import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

const env = process.env

export default defineNuxtConfig({
  ssr: false,

  // app config
  app: {
    // global transition
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  // env variablle that automatically override
  runtimeConfig: {
    public: {
      baseApiUrl: '',
      nodeEnv: '',
      port: 0,
      appPort: 0,
    },
  },

  // modules
  modules: [
    // chore
    '@nuxtjs/eslint-module',
    // styling & ui
    '@nuxtjs/tailwindcss',
    // 'nuxt-icon',
    // '@nuxtjs/color-mode',
    // management
    '@pinia/nuxt',
    // '@vueuse/nuxt',
    'nuxt-log4nuxt',
    // contents,
    '@element-plus/nuxt',
    'nuxt-bootstrap-icons',
    '@nuxtjs/svg-sprite',
    'dayjs-nuxt',
    // 'nuxt-lodash',
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

  dayjs: {
    locales: ['vi'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'vi',
  },

  log4nuxt: {
    isEnabled: true, // true or false, defaults to true
    logLevel: env.NUXT_PUBLIC_NODE_ENV === 'production' ? 'error' : 'trace', // trace, debug, info, warn or error, defaults to debug
  },

  // lodash: {
  //   prefix: '',
  //   upperAfterPrefix: false,
  // },

  css: [
    resolve('./assets/scss/_variables.scss'),
    resolve('./assets/scss/_layout.scss'),
    resolve('./assets/scss/app.scss'),
    resolve('./assets/scss/global.scss'),
    'vue-toast-notification/dist/theme-default.css',
  ],

  components: [
    {
      // prefix: 'Layout',
      pathPrefix: false,
      path: resolve('./components/layouts'),
      global: true,
    },
    {
      pathPrefix: false,
      path: resolve('./components/Common'),
      global: true,
    },
    {
      pathPrefix: false,
      path: resolve('./components/Header'),
      global: true,
    },
    {
      pathPrefix: false,
      path: resolve('./components/Dashboard'),
      global: true,
    },
    {
      pathPrefix: false,
      path: resolve('./components/System'),
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

  // module::color-mode
  // colorMode: {
  //   classSuffix: '',
  //   preference: 'light',
  //   fallback: 'light',
  // },

  vite: {
    build: {
      cssCodeSplit: false,
    },
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
