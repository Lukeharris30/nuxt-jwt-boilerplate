<script setup>
const runtimeConfig = useRuntimeConfig()

const appConfig = useAppConfig()

const $q = useQuasar()
$q.dark.set(true)
</script>
<template>
  <NuxtPage />
  <div>
    <h2>App config</h2>
    <pre>{{ appConfig }} </pre> 
   
  </div>
 
</template>
