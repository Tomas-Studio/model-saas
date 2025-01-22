<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { vAutoAnimate } from '@formkit/auto-animate'
import { Form } from '~/composables/useNamespace'
import { cn } from '~/lib/utils'
import { useForm } from 'vee-validate'
import { TEMP_SUBDOMAIN } from '~/constants'

const checkSubdomainAvailability = async (subdomain: string) => {
  try {
    const res = await useRequestFetch()(`/api/check-subdomain?domain=${subdomain}`)
    return !!res
  } catch (error) {
    console.log(error)
    return false
  }
}

const debouncedCheckSubdomainAvailability = useDebounceFn(
  (subdomain: string, resolve: (result: boolean) => void) => {
    checkSubdomainAvailability(subdomain).then(resolve) 
  },
  500
)

const validateSubdomain = (subdomain: string) => {
  return new Promise((resolve) => {
    debouncedCheckSubdomainAvailability(subdomain, resolve)
  })
}

const formSchema = toTypedSchema(z.object({
  subdomain: z.string().trim()
    .min(3, { message: 'Subdomain too short' })
    .refine(async (subdomain) => {
      return await validateSubdomain(subdomain)
    }, 'Subdomain not available')
}))

const { handleSubmit } = useForm({ validationSchema: formSchema })

const save = useCookie(TEMP_SUBDOMAIN)

const onSubmit = handleSubmit((values) => {
  save.value = values.subdomain
  navigateTo('/email')
})

</script>

<template>
  <Card :class="cn('w-[24rem]', $attrs.class ?? '')">
    <Card.Header>
      <Card.Title>Welcome</Card.Title>
      <Card.Description>Enter a subdomain for your organisation</Card.Description>
    </Card.Header>
    <Card.Content class="px-6 pb-6">
      <form @submit="onSubmit">
        <Form.Field v-slot="{ componentField }" name="subdomain" :validate-on-blur="false">
          <Form.Item v-auto-animate class="mb-4">
            <Form.Control>
              <Input type="text" placeholder="Subdomain" v-bind="componentField" class="h-10" />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        </Form.Field>
        <Button class="flex w-full">
          Continue
        </Button>
      </form>
    </Card.Content>
  </Card>
</template>
