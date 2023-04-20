// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-quasar-ui',
    '@vueuse/nuxt',
  ],
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
    apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      apiBase: '/api',
      googleSecret: '718979222890-mumo8keibd36f1a4mko4odk0590am8ds.apps.googleusercontent.com',

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
