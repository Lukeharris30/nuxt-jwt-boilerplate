<script setup>
const runtimeConfig = useRuntimeConfig()

const appConfig = useAppConfig()

const $q = useQuasar()
$q.dark.set(true)

</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  
  <!-- <div>
    <h2>App config</h2>
    <pre>{{ appConfig }} </pre> 
   
  </div> -->
 
</template>
