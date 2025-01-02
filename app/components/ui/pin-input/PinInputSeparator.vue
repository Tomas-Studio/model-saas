<script setup lang="ts">
import { Primitive, type PrimitiveProps, useForwardProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue';
import { cn } from '~/lib/utils'

const props = defineProps<PrimitiveProps & { class?: HTMLAttributes['class'] }>()
const forwardedProps = useForwardProps(props)
</script>

<template>
  <Primitive v-bind="forwardedProps" :class="cn('text-neutral-600', props.class)">
    <slot>
      •
    </slot>
  </primitive>
</template>
