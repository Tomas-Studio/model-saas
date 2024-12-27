export default function (tenant: string) {
  const { protocol, host } = useRequestURL()
  const currentTenant = useTenant() as string

  return currentTenant === tenant ? ''
    : host.startsWith(tenant) ? `${protocol}//${host}`
    : `${protocol}//${tenant ? `${tenant}.` : ''}${host}`
}