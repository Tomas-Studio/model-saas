import { AuthUser } from '~~/types/database';

export function userdto(user: AuthUser) {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    tenantId: user.tenantId,
    confirmed: user.confirmed,
  }
}