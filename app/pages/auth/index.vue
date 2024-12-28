<script lang="ts" setup>
import { Separator } from '~/components/ui/namespace'

const { href } = useRequestURL()
</script>

<template>
  <div class="flex items-center h-6 space-x-4"> 
    <NuxtLink to="/signin" class="hover:text-neutral-400 duration-300">SignIn</NuxtLink> 
    <Separator orientation="vertical" />
    <NuxtLink to="/signup" class="hover:text-neutral-400 duration-300">SignUp</NuxtLink> 
  </div>
</template>