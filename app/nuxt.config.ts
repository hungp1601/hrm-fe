const port = Number(process.env.NUXT_PUBLIC_APP_PORT)

export default defineNuxtConfig({
  devServer: {
    port,
  },

  ssr: false,

  devtools: { enabled: false },
  extends: ['../'],

  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light',
  },

  // hooks: {
  //   'pages:extend'(pages) {
  //     // Add fixed page
  //     console.log({ pages })
  //   },
  // },
})
