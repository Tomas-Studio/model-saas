// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    'nuxt-multi-tenancy',
    'nuxt-auth-utils',
  ],

  // routeRules: {
  //   '/auth': { redirect: '/auth/login' }
  // },

  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },

  multiTenancy: {
    tenantDynamicRoute: 'subdomain',
    rootDomains: ['localhost:5067'],
    sites: ['admin', 'auth', 'app']
  },

  css: ['~/styles/tailwind.css',],

  colorMode: { classSuffix: '', preference: 'dark', storageKey: 'app-theme' },
})