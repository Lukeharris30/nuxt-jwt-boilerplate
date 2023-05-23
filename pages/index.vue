<script setup>
definePageMeta({
  middleware: "auth",
});
const selected = ref(null);
// get files from the server
const { data: files, error } = await useFetch("/api/getFiles");
if (error.value) {
  console.log("error getting files", error.value);
  if (error.value) {
    console.log(error.value.status);
    await navigateTo("/login");
  }
}

const mappedFiles = computed(() => {
  if (files.value.folders.length > 0) {
    return files.value.folders.map((f) => ({
      key: f.key,
      label: f.display,
      icon: "folder",
      children: [],
    }));
  }
  return [];
});
</script>

<template>
  <div>
    <div>{{ selected }}</div>
    <q-tree
      :nodes="mappedFiles || []"
      node-key="key"
      v-model:selected="selected"
    ></q-tree>
  </div>
</template>
