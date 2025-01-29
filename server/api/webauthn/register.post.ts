import { z } from 'h3-zod'
import { kv } from '~~/server/utils/general'
import { WebAuthnRegisterEventHandlerOptions, WebAuthnUser  } from '#auth-utils'
import { createAuthUser, createCredential, excludeCredentials } from '~~/server/database/auth/actions/auth'
// import {   } from '../../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/webauthn/register'

export default defineWebAuthnRegisterEventHandler({
  async storeChallenge(event, challenge, attemptId) {
    console.log(challenge, attemptId)
    await kv.set(`auth:challenge:${attemptId}` challenge, { ttl: 60 })
  },

  async getChallenge(event, attemptId) {
    const challenge = await kv.get<string>(`auth:challenge:${attemptId}`)
    if (!challenge) {
      throw createError({
        statusCode: 400,
        message: 'Challenge not found or expired'
      })
    }
    await kv.del(`auth:challenge:${attemptId}`)
    return challenge
  },

  validateUser(userBody, event) {
    return z.object({
      email: z.string().email().trim(),
      tenant: z.string().trim(),
      role: z.string().trim().optional()
    }).parse(userBody)
  },

  async onSuccess(event, { user, credential }) {
    console.log(user, credential)

    const userData = await createAuthUser({ email: user.email, tenant: user.tenant })
      .catch((error) => {
        throw createError({
          statusCode: 400,
          message: `User already exists or ${error}`
        })
      })
    
    await createCredential({
      userId: userData.id,
      id: credential.id,
      publicKey: credential.publicKey,
      counter: credential.counter,
      backedup: credential.backedUp,
      transports: credential.transports
    })

    await setUserSession(event, {
      user: {
        id: userData.id,
        email: userData.email,
        role: userData.role,
        tenant: userData.tenant,
        registered: userData.registered,
        lastLoginAt: userData.lastLoginAt,
        publicKey: userData.publicKey
      }
    })
  },

  async excludeCredentials(event, userName) {
    console.log(userName)
    return await excludeCredentials(userName)
  }
})