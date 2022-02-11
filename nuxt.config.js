export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'legajo-frontend',
    htmlAttrs: {
      translate: 'no',
      lang: 'es',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['./assets/scss/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vee-validate.js',
    '~/plugins/repositories.js',
    '~/plugins/filters.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    '@nuxtjs/strapi',
    'nuxt-i18n',
  ],
  strapi: {
    entities: [
      'users',
      'workers',
      'sections',
      'document-factories',
      'documents',
      'upload',
      'job-position-changes',
      'work-licenses',
      'job-positions',
      'salaries',
      'salary-concepts',
      'bonuses',
    ],
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  i18n: {
    seo: false,
    locales: [
      {
        code: 'es',
        iso: 'es-ES',
        file: 'es.js',
      },
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'es',
  },
  loadingIndicator: '~/template/loading.html',
  env: {
    strapiUrl: process.env.STRAPI_URL || 'https://localhost:1337/',
  },
}
