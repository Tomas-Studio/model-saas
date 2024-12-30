import { defineConfig } from 'drizzle-kit'
import { consola } from 'consola'

export default defineConfig({
  dialect: 'turso',
  schema: './server/database/migration',
  out: './server/database/schema',
}) 