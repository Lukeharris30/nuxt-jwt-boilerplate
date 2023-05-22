<script setup>
definePageMeta({
  middleware: "auth",
});

const dropZoneRef = ref("");

const filesData = ref([]);
const { open, reset, files, onChange } = useFileDialog();

function onDrop(files) {
  console.log("dropped", files);
  filesData.value = files;
}

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);

const filesToUpload = computed(() =>
  files.value ? files.value : filesData.value
);

function removeFile() {
  console.log("removing");
  reset();
  filesData.value = [];
}
</script>

<template>
  <div>
    <h1>Upload Files</h1>
    <section>
      <div class="files-upload-container">
        <div
          v-if="filesToUpload.length === 0"
          ref="dropZoneRef"
          class="drop-zone flex-center flex shadow-2"
        >
          <div class="flex-center flex column">
            <QIcon name="upload" size="xl" />
            <div class="">Drop Files</div>
          </div>
        </div>
        <div class="self-center">
          <q-btn
            v-if="filesToUpload.length === 0"
            icon-right="upload"
            size="xl"
            @click="open()"
          >
            Add Files
          </q-btn>
        </div>
      </div>
      <div class="q-pa-md">
        <q-list v-if="filesToUpload.length > 0" bordered>
          <q-item v-for="(file, index) in filesToUpload" :key="index">
            <q-item-section avatar>
              <QIcon
                :name="file.type === 'image/png' ? 'image' : 'picture_as_pdf'"
                size="lg"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label top>
                {{ file.name }}
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label bottom class="text-grey-8">
                {{ file.type }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="row q-pt-lg q-pa-md q-gutter-md">
        <q-btn
          v-if="filesToUpload.length > 0"
          size="lg"
          color="primary"
          label="Upload"
          :icon-right="filesToUpload.length > 0 ? 'done' : ''"
        />
        <q-btn
          v-if="isOverDropZone || filesData.length > 0 || files"
          label="Delete"
          icon-right="close"
          @click="removeFile()"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.drop-zone {
  min-width: 300px;
  min-height: 300px;
  /* background: var(--q-dark-9); */
  border: 1px solid #eee;
}
</style>
