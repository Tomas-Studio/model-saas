import { defineConfig } from 'drizzle-kit'
import { consola } from 'consola'

export default defineConfig({
  dialect: 'turso',
  schema: './server/database/auth/schema',
  out: './server/database/auth/migrations',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.NUXT_TURSO_GROUP_AUTH_TOKEN!,
  },
}) 