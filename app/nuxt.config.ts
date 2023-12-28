const port = Number(process.env.NUXT_PUBLIC_APP_PORT)

export default defineNuxtConfig({
  devServer: {
    port,
  },

  devtools: { enabled: false },
  extends: ['../'],

  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light',
  },
})
