import type { AuthUser } from './database'

declare module '#auth-utils' {
  interface User extends Omit<AuthUser, 'createdAt' | 'updatedAt'> {}
}

export {}