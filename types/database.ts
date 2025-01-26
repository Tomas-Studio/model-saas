import { tables } from '../server/utils/auth-db'
import { tenantTables } from '../server/utils/tenant-db'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export type AuthUser = typeof tables.users.$inferSelect
export type InsertAuthUser = typeof tables.users.$inferInsert

export type Org = typeof tables.orgs.$inferSelect
export type InsertOrg = typeof tables.orgs.$inferInsert

export type Credential = typeof tables.credentials.$inferSelect
export type InsertCredential = typeof tables.credentials.$inferInsert

export type User = typeof tenantTables.invitations.$inferSelect
export type InsertUser = typeof tenantTables.invitations.$inferInsert

// Zod Schemas
export const insertAuthUserSchema = createInsertSchema(tables.users)
export const selectAuthUserSchema = createSelectSchema(tables.users)

export const insertOrgSchema = createInsertSchema(tables.orgs)
export const selectOrgSchema = createSelectSchema(tables.orgs)

export const insertCredentialSchema = createInsertSchema(tables.credentials)
export const selectCredentialSchema = createSelectSchema(tables.credentials)