<script lang="ts" setup>

</script>

<template>
  <div class="flex items-center h-6 space-x-4"> 
    <NuxtLink to="/authorize" class="hover:text-neutral-400 duration-300">SignIn</NuxtLink> 
    <Separator orientation="vertical" />
    <NuxtLink :to="`${useTenantUrl('account')}`" class="hover:text-neutral-400 duration-300">Create Org Account</NuxtLink> 
  </div>
</template>