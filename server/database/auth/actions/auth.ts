import { AuthUser, InsertAuthUser, InsertCredential, InsertOrg } from '~~/types/database'
import { useAuthDB, tables } from '~~/server/utils/auth-db'
import { eq, sql } from 'drizzle-orm'

const { users, orgs, credentials } = tables

export const createAuthUser = async (payload: InsertAuthUser) => {
  try {
    const record = await useAuthDB()
      .insert(users)
      .values(payload)
      .onConflictDoUpdate({
        target: users.email,
        set: {
          tenant: payload.tenant
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

export const createCredential = async (payload: InsertCredential) => {
  try {
    const record = await useAuthDB()
      .insert(credentials)
      .values(payload)
      .returning().get()
    return record
  } catch (error) {
    console.log(error)
    throw new Error('Failed to create credential')
  }
}

export const updateAuthUser = async (userId: string, payload: Partial<AuthUser>) => {
  try {
    const record = await useAuthDB()
      .update(users)
      .set(payload)
      .where(eq(users.id, userId))
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
      .update(users)
      .set({ lastLoginAt: new Date() })
      .where(eq(users.id, userId))
      .returning()
      .get()
    return record
  } catch (error) {
    console.error(error)
    throw new Error('Failed to update last active')
  }
}

export const findAuthUserWithSameDomain =  async (domain: string) => {
  const record = await useAuthDB()
    .select()
    .from(users)
    .where(eq(users.tenant, domain))
  return record
}

export const createOrg = async (payload: InsertOrg) => {
  try {
    const record = await useAuthDB()
      .insert(orgs)
      .values(payload)
      .onConflictDoUpdate({
        target: orgs.email,
        set: { email: payload.email, subdomain: payload.subdomain },
        setWhere: sql`subdomain = ${payload.subdomain}`
      })
      .returning()
      .get()
    return record
  } catch (error) {
    console.log(error)
    throw new Error('Failed to register an organisation')
  }
}

export const updateOrg = async (orgId: string, payload: Partial<AuthUser>) => {
  try {
    const record = await useAuthDB()
      .update(orgs)
      .set(payload)
      .where(eq(orgs.id, orgId))
      .returning()
      .get()
    return record
  } catch (error) {    
    console.error(error)
    throw new Error('Failed to update organisation')
  }
}

export const findOrgByEmail = async (email: string) => {
  try {
    const [org] = await useAuthDB()
      .select()
      .from(orgs)
      .where(eq(orgs.email, email))
    return org || null
  } catch (error) {
    console.log(error)
    return null
  }
}

export const excludeCredentials = async (email: string) => {
  const [user] = await useAuthDB()
    .select({ id: credentials.id, transports: credentials.transports })
    .from(users)
    .innerJoin(credentials, eq(credentials.userId, users.id))
    .where(eq(users.email, email))
  return user
}