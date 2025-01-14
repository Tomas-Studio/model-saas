export default function (tenant: string) {
  const { protocol } = useRequestURL()
  const host = import.meta.env.PROD ? '' : 'localhost:5067'
  const currentTenant = useTenant() as string

  return currentTenant === tenant ? ''
    : host.startsWith(tenant) ? `${protocol}//${host}`
    : `${protocol}//${tenant ? `${tenant}.` : ''}${host}`
}