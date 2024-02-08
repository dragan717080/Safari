// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    'nuxt-icon',
    'nuxt-headlessui',
    '@nuxt/test-utils/module',
    '@nuxt/devtools',
    'nuxt-aos',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt-alt/proxy',
    '@nuxtjs/sanity',
    '@nuxt/image'
  ],
  experimental: {
    reactivityTransform: true
  },
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  colorMode: {
    classSuffix: ''
  },
  headlessui: {
    prefix: ''
  },
  devtools: true,
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  runtimeConfig: {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    public: {
      firebase: {
        apiKey: process.env.apiKey,
        authDomain: process.env.authDomain,
        projectId: process.env.projectId,
        storageBucket: process.env.storageBucket,
        messagingSenderId: process.env.messagingSenderId,
        databaseURL: process.env.databaseURL,
        appId: process.env.appId
      }
    }
  },
  auth: {
    persistence: 'session',
    initialize: {
      onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
      onAuthStateChangedAction: 'onAuthStateChangedAction',
      subscribeManually: false
    },
    ssr: false,
    emulatorPort: 9099,
    emulatorHost: 'http://127.0.0.1'
  },
  plugins: [
    '~/plugins/firebase.client.ts',
    '~/plugins/getFlags.ts'
  ],
  testUtils: {},
  image: {
    sanity: {
      projectId: '34iungid',
      dataset: 'production',
      useCdn: true,
      apiVersion: '2024-01-30'
    }
  },
  sanity: {
    projectId: '34iungid',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-01-30'
  },
  proxy: {
    debug: false,
    experimental: {
      listener: false
    },
    proxies: {
      '/admin': {
        target: 'https://safari-studio.vercel.app/',
        changeOrigin: true
        // rewrite: path => path.replace(/^\/admin/, '')
      }
    }
  },
  app: {
    head: {
      title: 'Dragan Safari'
    }
  }
})
