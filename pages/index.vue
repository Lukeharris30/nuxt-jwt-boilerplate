<script setup>
import { useGetFolders } from "../composables/useGetFolders";
import { useUser } from "../stores/user";
import { useAppStringData } from "~/stores/appStringData";
definePageMeta({
  middleware: "auth",
});

const splitterModel = ref(50);

let selectedFolderTreeItem = ref(null);
const selectedFolderTreeFolders = ref([]);
// let selectedFolderTreeError = ref(null);

const { deleteUser } = useUser();
const { mappedRoot, selectedFolder } = await useGetFolders();
const { deleteAppData } = useAppStringData();

// getFilesByFolder
const {
  pending,
  data: selectedFolderTree,
  error: selectedFolderTreeError,
  refresh,
} = await useAsyncData(
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

// watch the error from the folder tree and delete user if it is a 401
watch(selectedFolderTreeError, async (newValue) => {
  if (newValue?.statusCode === 401) {
    console.log(
      "watcher: unauthorized error getting files by Folder, removing user",
      newValue,
      newValue?.statusCode
    );
    deleteUser();
    deleteAppData();
    await navigateTo("/login");
  }
});

// append folder tree to selected folder
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

const selectedFileObject = computed(() => {
  if (!selectedFolderTreeItem.value) return null;
  return selectedFolderTree.value.find(
    (f) => f.key === selectedFolderTreeItem.value
  );
});

const downloadFile = async function () {
  // check for null
  if (!selectedFolderTreeItem.value) return;

  const { data: arrayBuffer, error: fileError } = await useAsyncData(
    "file",
    () =>
      $fetch(`/api/getFile/${selectedFolderTreeItem.value}`, {
        params: {
          file: selectedFolderTreeItem.value,
        },
        responseType: "arrayBuffer",
      })
  );
  if (fileError.value) {
    console.log("caught file error", fileError.value);
    if (fileError.value.statusCode === 401) {
      console.log("caught file error, unauthorized 401");
      deleteUser();
      deleteAppData();
      await navigateTo("/login");
    }
  } else {
    const blob = new Blob([arrayBuffer.value]);

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = selectedFileObject.value.label;
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    // FOR BLOB
    // // Assume blob is the Blob object you have
    // const url = URL.createObjectURL(blob.value);

    // // Create a temporary link element
    // const link = document.createElement("a");
    // link.href = url;

    // // Specify the name for the downloaded file
    // link.download = selectedFileObject.value.label; // Replace 'output.file' with the appropriate file name

    // // Append the link to the body
    // document.body.appendChild(link);

    // // Trigger the download by simulating a click on the link
    // link.click();

    // // Remove the link from the body
    // document.body.removeChild(link);
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
                <q-skeleton size="20px" />
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" />
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item style="max-width: 300px">
              <q-item-section avatar>
                <q-skeleton size="20px" />
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" />
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item style="max-width: 300px">
              <q-item-section avatar>
                <q-skeleton size="20px" />
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" width="35%" />
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
          @click="downloadFile(selectedFolderTreeItem)"
          selected-color="primary"
        >
        </q-tree>
      </template>
    </q-splitter>
  </div>
</template>
