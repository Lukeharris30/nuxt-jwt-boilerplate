// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-quasar-ui'
  ],
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      apiBase: '/api'
    }
  },
  quasar: {
    extras: {
      fontIcons: ['material-icons']
    }
  },
  css:
    [
      // '@quasar/extras/roboto-font/roboto-font.css',
      // '@quasar/extras/material-icons/material-icons.css',
      // '@quasar/extras/fontawesome-v6/fontawesome-v6.css',
      '@quasar/extras/line-awesome/line-awesome.css'
      // '~/assets/styles/quasar.sass',
    ],
  

})
