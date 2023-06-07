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
let selectedFolderTreeError = ref(null);

const { deleteUser } = useUser();
const { mappedRoot, folderRoot, selectedFolder } = await useGetFolders();
const { deleteAppData } = useAppStringData();
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

if (selectedFolderError?.value?.statusCode === 401) {
  console.log(
    "error getting files by Folder",
    selectedFolderError.value,
    selectedFolderError?.value?.statusCode
  );
  deleteUser();
  deleteAppData();
  await navigateTo("/login");
}

watch(selectedFolderTreeError, async (newValue) => {
  if (newValue?.statusCode === 401) {
    console.log(
      "error getting files by Folder",
      newValue,
      newValue?.statusCode
    );
    deleteUser();
    deleteAppData();
    await navigateTo("/login");
  }
});
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

const downloadFile = async function () {
  // check for null
  if (!selectedFolderTreeItem.value) return;
  console.log("get the file");
  console.log("selectedFolderTreeItem", selectedFolderTreeItem.value);
  // console.log("downloadFile", selectedFolderTreeItem.value);
  // const response = await $fetch(
  //   `/api/getFile/${selectedFolderTreeItem.value}`,
  //   {
  //     params: {
  //       file: selectedFolderTreeItem.value,
  //     },
  //   }
  // );
  const { data: arrayBuffer, error: fileError } = await useAsyncData(
    "file",
    () =>
      $fetch(`/api/getFile/${selectedFolderTreeItem.value}`, {
        params: {
          file: selectedFolderTreeItem.value,
        },
        responseType: "blob",
      })
    // {
    //   transform: (file) => {
    //     return file;
    //   },
    // }
  );
  if (fileError.value) {
    console.log("caunt file error", fileError.value);
    if (fileError.value.statusCode === 401) {
      console.log("caunt file error 401");
      deleteUser();
      deleteAppData();
      await navigateTo("/login");
    }
  }
  console.log(arrayBuffer.value);
  // Assume arrayBuffer is the ArrayBuffer object you have
  // Assume blob is the Blob object you have
  const url = URL.createObjectURL(arrayBuffer.value);

  // Create a temporary link element
  const link = document.createElement("a");
  link.href = url;

  // Specify the name for the downloaded file
  link.download = "output.pdf"; // Replace 'output.file' with the appropriate file name

  // Append the link to the body
  document.body.appendChild(link);

  // Trigger the download by simulating a click on the link
  link.click();

  // Remove the link from the body
  document.body.removeChild(link);
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
        >
        </q-tree>
      </template>
    </q-splitter>
  </div>
</template>
