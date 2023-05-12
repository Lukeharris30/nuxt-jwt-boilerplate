// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-quasar-ui',
    '@vueuse/nuxt',
    '@pinia/nuxt',
  ],
  // for pinia vite error
  ssr: false,
  app: {

    head: {
      script: [
        {
          src: 'https://accounts.google.com/gsi/client',
        },
      ],
    }
  },
  runtimeConfig: {
    // The private keys which are only available server-side
    mulesoftEndpoint: 'https://api-stage.sram.com/exp-supplier-portal-api-dev/api/v1',
    mulesoftClientId: process.env.NUXT_MULESOFT_CLIENT_ID,
    mulesoftClientSecret: process.env.NUXT_MULESOFT_CLIENT_SECRET,
    // Keys within public are also exposed client-side
    public: {
      apiBase: '/api',
      googleSecret: process.env.NUXT_GOOGLE_SECRET,
      msalSecret: process.env.NUXT_MICROSOFT_CLIENT_ID,
      msalTenant: process.env.NUXT_MICROSOFT_TENANT_ID
    }
  },
  quasar: {
    extras: {
      fontIcons: ['material-icons'],
    },
    plugins: [
      "Notify"
    ], 
    config: {
      brand: {
        primary:'#e51937',

      }
    }
  },
  pinia: {
    autoImports:['defineStore', ['defineStore', 'acceptHMRUpdate']],
  },
  css:
    [
      // '@quasar/extras/roboto-font/roboto-font.css',
      // '@quasar/extras/material-icons/material-icons.css',
      // '@quasar/extras/fontawesome-v6/fontawesome-v6.css',
      '@quasar/extras/line-awesome/line-awesome.css',
      // '~/assets/styles/quasar.sass',
  
    'quasar/brand' 
    ],
  

})
