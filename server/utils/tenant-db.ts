import { drizzle } from 'drizzle-orm/libsql'
import { createClient as createLibsqlClient } from '@libsql/client'
import { createClient as createTursoClient } from '@tursodatabase/api'
import * as schema from '../database/tenant/schema'
import md5 from 'md5'

export const tables = schema

// const event = useRequestEvent()!

const config = useRuntimeConfig(useEvent())

const turso = createTursoClient({
  token: config.turso.apiToken,
  org: config.turso.org
})

export async function useTenantDB() {

  const url = await getLibsqlUrl()

  if (!url) {
    console.error('Failed to create database client: URL is null.')
    // return sendRedirect(event, '/')
  }
}

async function checkDatabaseExists() {
  const dbName = await getDatabaseName()

  if (!dbName) return false

  try {
    await turso.databases.get(dbName)
    return true
  } catch (error) {
    console.error('Error checking database existence:', error)
    return false
  }
}

async function getLibsqlUrl() {
  const dbName = await getDatabaseName()
  const url = getDatabaseUrl(dbName)
  console.log({ url })
  return url ? `libsql://${url}` : null
}

async function getDatabaseName() {
  const { user } = await requireUserSession(useEvent())
  const tenant = user.tenantId
  return tenant ? md5(tenant) : null
}

function getDatabaseUrl(dbName: string | null) {
  return dbName ? `${dbName}-${config.turso.org}.turso.io` : null
}
