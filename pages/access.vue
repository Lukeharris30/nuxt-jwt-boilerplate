<script setup>
definePageMeta({
  middleware: 'auth'
})

const {data: nav} = await useFetch('/api/getAppStringData')
</script>
<template>
    <h1>User Settings</h1>
    <pre>{{ nav }}</pre>
</template>