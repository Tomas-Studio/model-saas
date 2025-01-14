import { sql } from 'drizzle-orm'
import { text, int, sqliteTable } from 'drizzle-orm/sqlite-core'
import { nanoid16 } from '~~/server/utils/nanoid'

export const users = sqliteTable('users', {
  id: text().$default(()=> nanoid16()).primaryKey(),
  email: text().notNull().unique(),
  role: text({ enum: ['admin', 'member'] }).notNull().default('member'),
  tenantId: text().notNull(),
  otpSecret: int({ mode: 'number' }),
  passkeyPublicKey: text(),
  provider: text(),
  registered: int({ mode: 'boolean' }).notNull().default(false),
  confirmed: int({ mode: 'boolean' }).notNull().default(false),
  createdAt: int({ mode: 'timestamp' }).notNull().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: int({ mode: 'timestamp' }).notNull().$onUpdate(()=> sql`(CURRENT_TIMESTAMP)`),
  lastActive: int({ mode: 'timestamp' }).$onUpdate(()=> sql`(CURRENT_TIMESTAMP)`),
})