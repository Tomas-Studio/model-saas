import { drizzle } from 'drizzle-orm/libsql'
import { createClient as createLibsqlClient } from '@libsql/client'
import * as schema from '../database/auth/schema'
import { useRequestEvent } from 'nuxt/app'

export const tables = schema

const event = useRequestEvent()
const config = useRuntimeConfig(event)
const url = `libsql://${config.turso.authDatabaseName}-${config.turso.org}.turso.io`

const client = createLibsqlClient({
  url,
  authToken: config.turso.groupAuthToken
})

export function useAuthDB() {
  return drizzle(client, { schema })
}