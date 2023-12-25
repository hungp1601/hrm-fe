export default defineNuxtConfig({
  devServer: {
    port: Number(process.env.APP_PORT) || 4001,
  },

  devtools: { enabled: false },
  extends: ['../'],

  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light',
  },
})
