<script setup>
definePageMeta({
  middleware: "auth",
});
const selected = ref("U1JBTUNvbW1vbi9Gb3Jtcw==");
const splitterModel = 50;

let selectedFolderTreeItem = ref(null);
// get files from the server
let { data: root, error } = await useFetch("/api/getFiles");
if (error.value) {
  console.log("error getting files", error.value);
  if (error.value) {
    console.log(error.value.status);
    await navigateTo("/login");
  }
}

const mappedRoot = computed(() => {
  if (root.value?.folders?.length > 0) {
    return root.value.folders.map((f) => ({
      key: f.key,
      label: f.display,
      icon: "folder",
      children: [],
    }));
  }
  return [];
});

// const mappedFiles = computed(() => {
//   if (selectedTree.value) {
//     return selectedTree.value;
//     // ?.map((f) => ({
//     //   key: f.key,
//     //   label: f.display,
//     //   // icon: "document",
//     //   children: [],
//     // }));
//   }
// });

// getFilesByFolder
const {
  pending,
  data: selectedFolderTree,
  error: selectedFolderError,
  refresh,
} = await useLazyAsyncData(
  "selectedFolderTree",
  () =>
    $fetch(`/api/getFolderContents/${selected.value}`, {
      params: {
        folder: selected.value,
      },
      immediate: false,
    }),
  {
    transform: (selectedFolderTree) => {
      const files = selectedFolderTree.files.map((f) => ({
        key: f.key,
        label: f.display,
        icon: "description",
        children: [],
      }));
      const folders = selectedFolderTree.folders.map((f) => ({
        key: f.key,
        label: f.display,
        icon: "folder",
        children: [],
      }));
      return folders.concat(files);
    },
  }
);
watch(selected, (newValue) => {
  refresh();
});

if (selectedFolderError) {
  console.log("error getting files", selectedFolderError);
}
</script>

<template>
  <div>
    <q-splitter v-model="splitterModel" style="height: 40">
      <template v-slot:before>
        <q-tree
          :nodes="mappedRoot || []"
          selected-color="primary"
          node-key="key"
          v-model:selected="selected"
        ></q-tree>
      </template>
      <template v-slot:after>
        <div>{{ selectedFolderTreeItem }}</div>
        <div v-if="pending">pending</div>

        <q-tree
          v-else
          :nodes="selectedFolderTree || []"
          node-key="key"
          node-label="label"
          v-model:selected="selectedFolderTreeItem"
        >
        </q-tree>
      </template>
    </q-splitter>
  </div>
</template>
