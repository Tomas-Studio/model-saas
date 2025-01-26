import { useValidatedBody, z } from 'h3-zod'
import { findOrgByEmail } from '../../database/auth/actions/auth'
import { totp } from 'otplib'

export default defineEventHandler(async (event) => {
  const { email, otp: token } = await useValidatedBody(
    event,
    z.object({ 
      email: z.string().email('Invalid Email'),
      otp: z.string()
    })
  )

  // fetch org
  const org = await findOrgByEmail(email)

  if(!org){
    throw createError({
      statusCode: 500,
      statusMessage: `Internal Server Error`,
      message: 'Something went wrong'
    })
  }

  // verify otp
  const isValid = totp.check(token, org.otpSecret!)

  if (!isValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorised',
      message: 'Invalid token'
    })
  }

  return isValid
})