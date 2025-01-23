import { sql, relations } from 'drizzle-orm'
import { text, int, sqliteTable, unique, primaryKey } from 'drizzle-orm/sqlite-core'
import { customAlphabet } from 'nanoid'
import type { WebAuthnCredential } from '#auth-utils'

const nanoid16 = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 16)

export const users = sqliteTable('users', {
  id: text().$default(()=> nanoid16()).primaryKey(),
  email: text().notNull().unique(),
  role: text({ enum: ['admin', 'member'] }).notNull().default('member'),
  tenantId: text().notNull(),
  publicKey: text(),
  registered: int({ mode: 'boolean' }).notNull().default(false),
  createdAt: int({ mode: 'timestamp' }).notNull().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: int({ mode: 'timestamp' }).notNull().$onUpdate(()=> sql`(CURRENT_TIMESTAMP)`),
  lastLoginAt: int({ mode: 'timestamp' }).$onUpdate(()=> sql`(CURRENT_TIMESTAMP)`),
})

export const orgs = sqliteTable('orgs', {
  id: text().$default(()=> nanoid16()).primaryKey(),
  email: text().notNull().unique(),
  otpSecret: int({ mode: 'number' }),
  subdomain: text().notNull().unique(),
  confirmed: int({ mode: 'boolean' }).notNull().default(false),
  createdAt: int({ mode: 'timestamp' }).notNull().default(sql`(CURRENT_TIMESTAMP)`),
})

export const credentials = sqliteTable('credentials', {
  userId: text().references(() => users.id, { onDelete: 'cascade' }).notNull(),
  id: text().notNull().unique(),
  publicKey: text().notNull(),
  counter: int().notNull(),
  backup: int({ mode: 'boolean' }).notNull(),
  transports: text().notNull().$type<WebAuthnCredential['transports']>()
}, (table) => [
    primaryKey({ columns: [table.userId, table.id] , name: 'credential_id' })
  ]
)

/**
 * Relations (useful for queries)
 */

export const usersRelations = relations(users, ({ many }) => ({
  credentials: many(credentials)
}))

export const credentialsRelations = relations(credentials, ({ one }) => ({
  user: one(users, {
    fields: [credentials.userId],
    references: [users.id]
  })
}))