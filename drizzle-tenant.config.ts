import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'turso',
  schema: './server/database/tenant/schema',
  out: './server/database/tenant/migrations',
})