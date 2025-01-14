// import useTenantUrl from './app/composables/useTenantUrl'

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

  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },

  multiTenancy: {
    tenantDynamicRoute: 'subdomain',
    rootDomains: ['localhost:5067'],
    sites: ['auth', 'account']
  },

  runtimeConfig: {
    session: {
      password: '',
      maxAge: 60 * 60 * 24 * 2 // Session expires after 2 days
    },
    turso: {
      groupAuthToken: '',
      apiToken: '',
      org: '',
      authDatabaseName: '',
      tenantDatabaseName: ''
    }
  },

  // routeRules: {
  //   '/': { redirect: `auth.localhost:5067` }
  // },

  nitro: {
    experimental: {
      asyncContext: true
    }
  },

  css: ['~/styles/tailwind.css',],

  colorMode: { classSuffix: '', preference: 'dark', storageKey: 'app-theme' },
})