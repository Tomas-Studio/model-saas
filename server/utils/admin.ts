import { User } from '#auth-utils';
import { AuthUser } from '~~/types/database';

export function requireAdmin(user: User) {
  if(user.role === 'admin') return true
  
  throw createError({
    status: 401,
    statusMessage: 'Unathorized',
    message: 'Cannot create db client'
  })
}