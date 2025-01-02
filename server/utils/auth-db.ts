import { drizzle } from 'drizzle-orm/libsql'
import { createClient as createLibsqlClient } from '@libsql/client'
import * as schema from '../database/auth/schema'

export const tables = schema

const config = useRuntimeConfig()
const url = `libsql://${config.turso.authDatabaseName}-${config.turso.org}.turso.io`

const client = createLibsqlClient({
  url,
  authToken: config.turso.groupAuthToken
})

export function useAuthDB() {
  return drizzle(client, { schema })
}