import { useValidatedBody, z } from 'h3-zod'
import { createOrg } from '../../database/auth/actions/auth'
import { OTP_STEP, TEMP_SUBDOMAIN } from '~/constants'
import { totp } from 'otplib'
import { expireAtByMinutes, expiresToMaxAge } from '~~/server/utils/general'
import { customAlphabet } from 'nanoid'
import { Resend } from 'resend'
import { otpTemplate } from '~~/server/utils/email'

const nanoid32 = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 32)

export default defineEventHandler(async (event) => {
  const { email } = await useValidatedBody(
    event,
    z.object({ email: z.string().email('Invalid Email') })
  )
  const config = useRuntimeConfig(event)

  // get verified subdomain
  const subdomain = getCookie(event, TEMP_SUBDOMAIN)

  if(!subdomain){
    throw createError({
      status: 400,
      statusMessage: 'Bad Request',
      message: 'Missing key parameter'
    })
  }

  // set otp option and generate otp secret
  totp.options = { step: 300, window: 0 }

  const otpSecret = nanoid32()

  const otp = totp.generate(otpSecret)

  await createOrg({ email, subdomain, otpSecret })
    .catch(err => {
      throw createError({ status: 500, statusMessage: 'Server Error', message: `${err}` })
    })

  // send mail
  const resend = new Resend(config.resendApiKey)

  const mailOptions = {
    from: 'ArcticPoll <onboarding@resend.dev>',
    to: email,
    subject: 'Email Verification: OTP Code ',
    html: otpTemplate(otp),
  }

  const mailResponse = await resend.emails.send(mailOptions)

  if (mailResponse.error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Internal Server Error. ${mailResponse.error.message}`,
      message: 'Failed to send email'
    })
  }

  // set otp time cookie
  setCookie(event, OTP_STEP, '300', { 
    expires: new Date(expireAtByMinutes(5)),
    sameSite: true,
    maxAge: expiresToMaxAge(new Date(expireAtByMinutes(5)))
  })
  
  deleteCookie(event, TEMP_SUBDOMAIN)

  return sendNoContent(event)
})