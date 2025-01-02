import { text, int, sqliteTable } from 'drizzle-orm/sqlite-core'
import { nanoid16 } from '~~/server/utils/nanoid'
import { sql } from 'drizzle-orm'

export const users = sqliteTable('users', {
  id: text().$defaultFn(()=> nanoid16()).primaryKey(),
  email: text().notNull().unique(),
  role: text({ enum: ['admin', 'member'] }).notNull().default('member'),
  tenantId: text().notNull().unique(), 
  password: text(),
  otpSecret: int({ mode: 'number' }),
  passkeyPublicKey: text(),
  isRegistered: int({ mode: 'boolean' }).notNull().default(false),
  confirmed: int({ mode: 'boolean' }).notNull().default(false),
  createdAt: int({ mode: 'timestamp' }).notNull(),
  updatedAt: int({ mode: 'timestamp' }).notNull().$onUpdate(()=> sql`(CURRENT_TIMESTAMP)`)
})