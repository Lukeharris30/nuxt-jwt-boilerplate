<script setup>
definePageMeta({
  middleware: "auth",
});
const selected = ref("U1JBTUNvbW1vbi9Gb3Jtcw==");
const splitterModel = 50;

let selectedFolderTreeItem = ref(null);
const selectedFolderTreeFolders = ref([]);
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
      lazy: true,
      icon: "folder",
      children: [],
    }));
  }
  return [];
});

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
      selectedFolderTreeFolders.value = selectedFolderTree.folders.map((f) => ({
        key: f.key,
        label: f.display,
        icon: "folder",
        children: [],
      }));
      return files;
    },
  }
);
watch(selected, (newValue) => {
  selectedFolderTreeFolders.value = [];
  refresh();
});

if (selectedFolderError) {
  console.log("error getting files", selectedFolderError);
}

const onLazyLoad = function (node, key, done, fail) {
  console.log("onLazyLoad");
  // append selectedFolderTreeFolders to root
  // find selectd in root
  const selectedFolder = root.value.folders.find(
    (f) => f.key === selected.value
  );
  if (selectedFolder) {
    selectedFolder.children = selectedFolderTreeFolders.value;
  }
};
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
        <div>{{ selectedFolderTreeFolders }}</div>
        <div v-if="pending">pending</div>
        <q-tree
          v-else
          :nodes="selectedFolderTree || []"
          node-key="key"
          node-label="label"
          v-model:selected="selectedFolderTreeItem"
          @lazy-load="onLazyLoad"
        >
        </q-tree>
      </template>
    </q-splitter>
  </div>
</template>
