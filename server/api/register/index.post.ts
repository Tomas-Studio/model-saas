import { useValidatedBody, z } from 'h3-zod'
import { createAuthUser } from '../../database/auth/actions/auth'
import { OTP_STEP, TEMP_SUBDOMAIN } from '~/constants'
import { totp } from 'otplib'
import { expireAtByMinutes, expiresToMaxAge } from '~~/server/utils/general'

export default defineEventHandler(async (event) => {
  const { email } = await useValidatedBody(
    event,
    z.object({ email: z.string().email('Invalid Email') })
  )

  const config = useRuntimeConfig(event)

  // set otp option
  totp.options = { step: 300, window: 0 }

  const otp = totp.generate(config.otpSecret);

  const domain = getCookie(event, TEMP_SUBDOMAIN)

  // deleteCookie(event, TEMP_SUBDOMAIN)

  setCookie(event, OTP_STEP, '300', { 
    expires: new Date(expireAtByMinutes(5)),
    sameSite: true,
    maxAge: expiresToMaxAge(new Date(expireAtByMinutes(5)))
  })
  
  return {
    domain, email, otp, 
    options: totp.options
  }
})