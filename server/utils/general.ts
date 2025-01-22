export function expireAtByMinutes(minutes: number) {
  const date = new Date().setMinutes(new Date().getMinutes() + minutes)
  return new Date(date).toISOString()
}

export function expiresToMaxAge(expiresDate: Date) {
  const durationMs = expiresDate.getTime() - Date.now()
  const maxAgeSeconds = Math.floor(durationMs / 1000)
  return maxAgeSeconds
}