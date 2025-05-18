export default defineNuxtConfig({
  experimental: {
    viewTransition: false
  },
  app: {
    rootAttrs: {
      'data-vaul-drawer-wrapper': '',
      'class': 'bg-default'
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    }
  },
  ssr: false,
  image: {
  },
  devtools: { enabled: false },
  colorMode: {
    classSuffix: '',
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/image-edge',
    ['@nuxtjs/i18n', { // Pass options as the second element in the array
      defaultLocale: 'de',
      locales: [
        { code: 'en', name: 'English', file: 'en.json' },
        { code: 'de', name: 'Deutsch', file: 'de.json' }
      ],
      scrollBehavior: false,
      langDir: 'locales', // Example of another option
      strategy: 'prefix_except_default', // Example of another option
    }]
  ],

  css: ['~/assets/css/colors.css', '~/assets/css/fonts.css', '~/assets/css/main.css'],
  future: {
    compatibilityVersion: 4
  },
  compatibilityDate: '2024-11-27'
});