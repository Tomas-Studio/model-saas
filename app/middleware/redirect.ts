export default defineNuxtRouteMiddleware(() => {
  const subdomain = useTenant()
  const { href } = useRequestURL()

  if (subdomain === 'auth') {
    return navigateTo(`${href}login`, { redirectCode: 301, external: true })
  }
})