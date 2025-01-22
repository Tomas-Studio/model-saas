<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { vAutoAnimate } from '@formkit/auto-animate'
import { Form } from '~/composables/useNamespace'
import { cn } from '~/lib/utils'
import { useForm } from 'vee-validate'

const formSchema = toTypedSchema(z.object({
  email: z.string()
    .min(1, { message: 'Enter email' })
    .email({ message: 'Enter a valid email' }),
}))

const { handleSubmit } = useForm({ validationSchema: formSchema })

const onSubmit = handleSubmit((values) =>  {
  
})
</script>

<template>
  <Card :class="cn('w-[24rem]', $attrs.class ?? '')">
    <Card.Header>
      <Card.Title>Organisation Email</Card.Title>
      <Card.Description>Enter email associated with your organisation</Card.Description>
    </Card.Header>
    <Card.Content class="px-6 pb-6">
      <form @submit="onSubmit">
        <Form.Field v-slot="{ componentField }" name="email" :validate-on-blur="false">
          <Form.Item v-auto-animate class="mb-4">
            <!-- <Form.Label>Subdomain</Form.Label> -->
            <Form.Control>
              <Input type="email" placeholder="Email" v-bind="componentField" class="h-10" />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        </Form.Field>
        <Button class="flex w-full">
          Verify Email
        </Button>
      </form>
    </Card.Content>
  </Card>
</template>
