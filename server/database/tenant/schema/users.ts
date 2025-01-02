import { sql } from 'drizzle-orm'
import { text, int, sqliteTable } from 'drizzle-orm/sqlite-core'
import { nanoid16 } from '~~/server/utils/nanoid'

export const invitations = sqliteTable('invitations', {
  id: text().$default(()=> nanoid16()).primaryKey(),
  email: text().notNull().unique(),
  token: text().notNull().unique(),
  inviterId: text().notNull(),
  expiresAt: int({ mode: 'timestamp' }).notNull(),
  isAccepted: int({ mode: 'boolean' }).notNull().default(false),
  createdAt: int({ mode: 'timestamp' }).notNull().default(sql`(CURRENT_TIMESTAMP)`),
})

export const users = sqliteTable('users', {
  // id: text().$default(()=> nanoid16()).primaryKey(),
  id: text().notNull().primaryKey(),
  email: text().notNull(),
  role: text({ enum: ['admin', 'member'] }).notNull().default('member'),
  createdAt: int({ mode: 'timestamp' }).notNull().default(sql`(CURRENT_TIMESTAMP)`),
  confirmed: int({ mode: 'boolean' }).notNull().default(false),
  updatedAt: int({ mode: 'timestamp' }).notNull().$onUpdate(()=> sql`(CURRENT_TIMESTAMP)`),
})