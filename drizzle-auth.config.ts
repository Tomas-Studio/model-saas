import { defineConfig } from 'drizzle-kit'

if (!process.env.NUXT_TURSO_AUTH_DATABASE_NAME) {
  throw new Error('NUXT_TURSO_AUTH_DATABASE_NAME is missing')
}

if (!process.env.NUXT_TURSO_ORG) {
  throw new Error('NUXT_TURSO_ORG is missing')
}

if (!process.env.NUXT_TURSO_GROUP_AUTH_TOKEN) {
  throw new Error('NUXT_TURSO_GROUP_AUTH_TOKEN is missing')
}

const url = `libsql://${process.env.NUXT_TURSO_AUTH_DATABASE_NAME}-${process.env.NUXT_TURSO_ORG}.turso.io`

export default defineConfig({
  dialect: 'turso',
  schema: './server/database/auth/schema',
  out: './server/database/auth/migrations',
  dbCredentials: {
    url,
    authToken: process.env.NUXT_TURSO_GROUP_AUTH_TOKEN,
  },
  casing: 'snake_case'
}) 