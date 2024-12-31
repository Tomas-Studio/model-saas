<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { vAutoAnimate } from '@formkit/auto-animate'
import { Form } from '~/composables/useNamespace'
import { cn } from '~/lib/utils'

const checkSubdomainAvailability = async (subdomain: string) => {}

const formSchema = toTypedSchema(z.object({
  subdomain: z.string().trim().min(3, { message: 'Subdomain too short' }).refine(async (subdomain) => {
    const isAvailable = await checkSubdomainAvailability(subdomain)
    return isAvailable
  }, 'Subdomain not available')
}))
</script>

<template>
  <Card :class="cn('w-[24rem]', $attrs.class ?? '')">
    <Card.Header>
      <Card.Title>Welcome</Card.Title>
      <Card.Description>Enter a subdomain for your organisation</Card.Description>
    </Card.Header>
    <Card.Content class="px-6 pb-6">
      <Form.Root :validation-schema="formSchema">
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
      </Form.Root>
    </Card.Content>
  </Card>
</template>
