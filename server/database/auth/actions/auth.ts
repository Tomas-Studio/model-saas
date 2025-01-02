import { AuthUser, InsertAuthUser } from '~~/types/database'
import { useAuthDB, tables } from '~~/server/utils/auth-db'
import { eq } from 'drizzle-orm'

export const createAuthUser = async (payload: InsertAuthUser) => {
  try {
    const record = await useAuthDB()
      .insert(tables.users)
      .values(payload)
      .onConflictDoUpdate({
        target: tables.users.email,
        set: {
          tenantId: payload.tenantId
        }
      })
      .returning()
      .get()
    return record
  } catch (error) {
    console.log(error)
    throw new Error('Failed to create new user')
  }
} 

export const updateAuthUser = async (userId: string, payload: Partial<AuthUser>) => {
  try {
    const record = await useAuthDB()
      .update(tables.users)
      .set(payload)
      .where(eq(tables.users.id, userId))
      .returning()
      .get()
    return record
  } catch (error) {
    console.error(error)
    throw new Error('Failed to update user')
  }
}

export const updateLastActiveTimestamp = async (
  userId: string,
): Promise<InsertAuthUser> => {
  try {
    const record = await useAuthDB()
      .update(tables.users)
      .set({ lastActive: new Date() })
      .where(eq(tables.users.id, userId))
      .returning()
      .get()
    return record
  } catch (error) {
    console.error(error)
    throw new Error('Failed to update last active')
  }
}