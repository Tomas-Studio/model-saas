import { createClient as createTursoClient } from '@tursodatabase/api'
import { getDatabaseName } from '../utils/tenant-db'
import { requireAdmin } from '../utils/admin'


export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  requireAdmin(user)
  const config = useRuntimeConfig(event)

  const databaseExists = await checkDatabaseExists()

  if (databaseExists) {
    return { created: true }
  }

  const dbName = await getDatabaseName()

  const turso = createTursoClient({
    token: config.turso.apiToken,
    org: config.turso.org
  })

  try {
    await turso.databases.create(dbName, {
      schema: config.turso.tenantDatabaseName,
      group: 'articpoll',
    })
  } catch (error) {
    console.error("Error processing webhook:", error)
    throw createError({
      status: 500,
      statusMessage: 'Server Error',
      message: `Error: ${error}`,
      data: { created: false }
    })
  }

  // return sendRedirect(event, `http://${user.tenantId}/admin/dashboard`)

  return { created: true }
})