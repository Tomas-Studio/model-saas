<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { vAutoAnimate } from '@formkit/auto-animate'
import { Form, PinInput } from '~/composables/useNamespace'
import { cn } from '~/lib/utils'
import { useForm } from 'vee-validate'

const formSchema = toTypedSchema(z.object({
  pin: z.array(z.coerce.string()).length(6, { message: 'Invalid input' }),
}))

const successful = ref(false)

const { handleSubmit, setFieldValue, isSubmitting } = useForm({
  validationSchema: formSchema,
  initialValues: { pin: [] },
})

const handleComplete = (e: string[]) => console.log(e.join(''))
</script>

<template>
  <Card :class="cn('w-[24rem]', $attrs.class ?? '')">
    <Card.Header>
      <Card.Title>Check Your Indox</Card.Title>
      <Card.Description>We've sent a verification code to tjomas@gmail.com. Please check your email, including the spam folder</Card.Description>
    </Card.Header>
    <Card.Content class="px-6 pb-6">
      <form>
        <Form.Field v-slot="{ componentField, value }" name="pin" >
          <Form.Item v-auto-animate class="mb-4">
            <Form.Control>
              <PinInput.Root
                id="pin-iuput"
                class=""
                type="number"
                :model-value="value"
                :name="componentField.name"
                @complete="handleComplete"
                @update:model-value="(arrStr) => {
                  setFieldValue('pin', arrStr.filter(Boolean))
                }"
              >
                <PinInput.Group class="gap-1">
                  <template v-for="(id, index) in 6" :key="id">
                    <PinInput.Input
                      class="rounded-md border size-10"
                      :index="index"
                    />
                    <template v-if="index !== 5">
                      <PinInput.Separator />
                    </template>
                  </template>
                </PinInput.Group>
              </PinInput.Root>
            </Form.Control>
            <Form.Message />
          </Form.Item>
        </Form.Field>
        <Button class="mt-2">
          {{ isSubmitting ? 'Verifying...' : 'Submit' }}
        </Button>
      </form>
    </Card.Content>
  </Card>
</template>
