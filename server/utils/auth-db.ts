import { drizzle } from 'drizzle-orm/libsql'
import { createClient as createLibsqlClient } from '@libsql/client'
import * as schema from '../database/auth/schema'

export const tables = schema

// const config = useRuntimeConfig(useEvent())
const url = `libsql://${process.env.NUXT_TURSO_AUTH_DATABASE_NAME}-${process.env.NUXT_TURSO_ORG}.turso.io`

const client = createLibsqlClient({
  url,
  authToken: process.env.NUXT_TURSO_GROUP_AUTH_TOKEN
})

export function useAuthDB() {
  return drizzle(client, { schema })
}