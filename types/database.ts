import { tables } from '../server/utils/auth-db'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export type AuthUser = typeof tables.users.$inferSelect
export type InsertAuthUser = typeof tables.users.$inferInsert

// Zod Schemas
export const insertAuthUserSchema = createInsertSchema(tables.users)
export const selectAuthUserSchema = createSelectSchema(tables.users)