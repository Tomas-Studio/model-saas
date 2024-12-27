<script lang="ts" setup>
const tenant = useTenant()
const url = useTenantUrl(tenant)
</script>

<template>
  <div>
    {{ tenant }}
    {{ url }}
  </div>
</template>
