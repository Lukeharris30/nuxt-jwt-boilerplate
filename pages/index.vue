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

if (selectedFolderError) {
  console.log("error getting files", selectedFolderError);
}

const onLazyLoad = function (node, key, done, fail) {
  console.log("onLazyLoad");
  // append selectedFolderTreeFolders to root
  // find selectd in root
  const selectedFolderFromRoot = root.value.folders.find(
    (f) => f.key === selectedFolder.value
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
          v-model:selected="selectedFolder"
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
