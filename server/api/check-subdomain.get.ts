import { useValidatedQuery, z } from 'h3-zod'
import { findAuthUserWithSameDomain } from '../database/auth/actions/auth'

export default defineEventHandler(async (event) => {
  const { domain } = await useValidatedQuery(
    event, 
    z.object({ domain: z.string() })
  )
  const data = await findAuthUserWithSameDomain(domain)
  return data.length === 0
})