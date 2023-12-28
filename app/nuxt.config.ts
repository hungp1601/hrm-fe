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

  nitro: {
    storage: {
      data: {
        driver: 'vercelKV',
        /* Vercel KV driver options */
      },
    },
  },

  // hooks: {
  //   'pages:extend'(pages) {
  //     // Add fixed page
  //     console.log({ pages })
  //   },
  // },
})
