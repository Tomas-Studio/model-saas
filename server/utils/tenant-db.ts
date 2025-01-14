import { drizzle } from 'drizzle-orm/libsql'
import { createClient as createLibsqlClient } from '@libsql/client'
import { createClient as createTursoClient } from '@tursodatabase/api'
import * as schema from '../database/tenant/schema'
import md5 from 'md5'

export const tenantTables = schema

const turso = createTursoClient({
  token: process.env.NUXT_TURSO_API_TOKEN!,
  org: process.env.NUXT_TURSO_ORG!
})

export async function useTenantDB() {
  const url = await getLibsqlUrl()
  
  const client = createLibsqlClient({
    url: url,
    authToken: process.env.NUXT_TURSO_GROUP_AUTH_TOKEN
  })
  return drizzle(client, { schema })
}

async function getLibsqlUrl() {
  const dbName = await getDatabaseName()
  const url = getDatabaseUrl(dbName)
  return `libsql://${url}`
}

function getDatabaseUrl(dbName: string) {
  return `${dbName}-${process.env.NUXT_TURSO_ORG}.turso.io`
}

export async function getDatabaseName() {
  const host = getRequestHost(useEvent())
  const tenantFromHost = host.split('.')[0]

  const userSession = await getUserSession(useEvent())
  const tenant = userSession.user?.tenantId ?? tenantFromHost

  return md5(tenant)
}

export async function checkDatabaseExists() {
  const dbName = await getDatabaseName()
  try {
    await turso.databases.get(dbName)
    return true
  } catch (error) {
    console.error('Error checking database existence:', error)
    return false
  }
}