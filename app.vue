<script setup>
const runtimeConfig = useRuntimeConfig()

const appConfig = useAppConfig()
</script>
<template>
  <NuxtPage />
  <div>
    <h2>runtime config</h2>
    <pre>{{ appConfig }} </pre> 
    <h2>app config </h2>
  </div>
 
</template>
