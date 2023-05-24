<script setup>
import { useGetFolders } from "../composables/useGetFolders";
definePageMeta({
  middleware: "auth",
});

const splitterModel = 50;

let selectedFolderTreeItem = ref(null);
const selectedFolderTreeFolders = ref([]);

const { mappedRoot, folderRoot, selectedFolder } = await useGetFolders();

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
        <div v-if="pending">
          <div class="q-pa-md">
            <q-item style="max-width: 300px">
              <q-item-section avatar>
                <q-skeleton type="QIcon" />
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" width="65%" />
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item style="max-width: 300px">
              <q-item-section avatar>
                <q-skeleton type="QIcon" />
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" width="90%" />
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item style="max-width: 300px">
              <q-item-section avatar>
                <q-skeleton type="QIcon" />
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" width="35%" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" />
                </q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </div>
        <q-tree
          v-else
          :nodes="selectedFolderTree || []"
          node-key="key"
          node-label="label"
          default-expand-all
          v-model:selected="selectedFolderTreeItem"
        >
        </q-tree>
      </template>
    </q-splitter>
  </div>
</template>
