<script setup>
import { useGetFolders } from "../composables/useGetFolders";
definePageMeta({
  middleware: "auth",
});

const splitterModel = 50;

let selectedFolderTreeItem = ref(null);
const selectedFolderTreeFolders = ref([]);

const { mappedRoot, root, selectedFolder } = await useGetFolders();

// getFilesByFolder
const {
  pending,
  data: selectedFolderTree,
  error: selectedFolderError,
  refresh,
} = await useLazyAsyncData(
  "selectedFolderTree",
  () =>
    $fetch(`/api/getFolderContents/${selectedFolder.value}`, {
      params: {
        folder: selectedFolder.value,
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
        lazy: true,
        children: [],
      }));
      return files;
    },
  }
);
watch(selectedFolder, (newValue) => {
  selectedFolderTreeFolders.value = [];
  refresh();
});

const expanded = ref([]);

if (selectedFolderError.value) {
  console.log("error getting files", selectedFolderError);
}

const onLazyLoad = function ({ node, key, done, fail }) {
  selectedFolder.value = key;

  // create a promise to resolve when pending is false
  const interval = setInterval(() => {
    if (!pending.value) {
      clearInterval(interval);
      done(selectedFolderTreeFolders.value);
    }
  }, 100);
};
</script>

<template>
  <div>
    <q-splitter v-model="splitterModel" style="height: 40">
      <template v-slot:before>
        <q-tree
          :nodes="mappedRoot || []"
          selected-color="primary"
          expandable
          node-key="key"
          v-model:selected="selectedFolder"
          @lazy-load="onLazyLoad"
        ></q-tree>
      </template>
      <template v-slot:after>
        <div v-if="pending">pending</div>
        <q-tree
          v-else
          :nodes="selectedFolderTree || []"
          node-key="key"
          node-label="label"
          default-expand-all
          v-model:selected="selectedFolderTreeItem"
          v-model:expanded="expanded"
        >
        </q-tree>
      </template>
    </q-splitter>
  </div>
</template>
