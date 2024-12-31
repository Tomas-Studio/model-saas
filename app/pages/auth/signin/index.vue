<script lang="ts" setup>

</script>

<template>
  <div class="flex flex-col items-center space-y-6">
    <NuxtLink to="/signin/member" class="grid place-items-center w-96 h-24 border rounded-xl text-xl hover:border-blue-950 duration-300">
      Member
    </NuxtLink>
    <Separator orientation="horizotal" label="OR" />
    <NuxtLink to="/signin/admin" class="grid place-items-center w-96 h-24 border rounded-xl text-xl hover:border-blue-950 duration-300">
      Admin
    </NuxtLink>
  </div>
</template>
