import { OTP_STEP } from '~/constants'

export default function () {
  const otptime = useCookie(OTP_STEP)

  const TIME_LEFT = useState('time-left', () => +otptime.value!)

  const minutes = useState('minutes', () => format(Math.floor(TIME_LEFT.value / 60) % 60))
  const seconds = useState('seconds', () => format(TIME_LEFT.value % 60))

  function format(time: number): string {
    return String(time).padStart(2, '0')
  }

  function timerFn() {
    seconds.value = format(TIME_LEFT.value % 60)
    minutes.value = format(Math.floor(TIME_LEFT.value / 60) % 60)
    if(TIME_LEFT.value > 0){
      TIME_LEFT.value--
      otptime.value = `${TIME_LEFT.value}`
    }
  }

  return {
    minutes, seconds, timerFn,
  }
}