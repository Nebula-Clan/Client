import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - huddle',
    title: 'huddle',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/quill/quill.core.css',
    '@/assets/quill/quill.snow.css',
    '@/assets/quill/quill.bubble.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~plugins/quill', ssr: false }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: 'http://huddle.pythonanywhere.com'
  },

  // Auth module configuration
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/auth/login',
            method: 'post',
            propertyName: 'access_token'
          },
          user: {
            url: '/api/auth/user',
            method: 'get',
            propertyName: 'user'
          }
        },
      },
      github: {
        _scheme: 'oauth2',
        scope: ['openid', 'profile', 'email'],
        access_type: undefined,
        access_token_endpoint: undefined,
        response_type: 'token',
        token_type: 'Bearer',
        redirect_uri: 'http://localhost:3000/feed',
        token_key: 'access_token',
        state: 'UNIQUE_AND_NON_GUESSABLE',
        client_id: 'f411dade05bf26eadb71',
        client_secret: 'ad06bb50f00202d3f0a70d6d1a2880d4770fa048'
      }
    },
    redirect: {
      login: '/feed',
      logout: '/feed',
      callback: '/feed',
      home: '/feed'
    }
  },
  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#BB86FC',
          accent: '#4aff80',
          secondary: '#03dac6',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: '#CF6679',
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
}
