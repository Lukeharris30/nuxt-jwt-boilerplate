<script setup>
const runtimeConfig = useRuntimeConfig()

const dropZoneRef = ref('')

const filesData = ref([])

function onDrop(files) {
  console.log('dropped', files)
  filesData.value = files
}

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)
</script>

<template>
  <h1>About</h1>
  <section>
    
    <h2>Upload a File</h2>
    <div ref="dropZoneRef" class="drop-zone flex-center flex">
      <div class="flex-center flex column">
        <QIcon name="upload_file" size="xl"></QIcon>
        <div class="">Drop Files</div>
      </div>
    </div>
    <div class="q-pa-md" style="max-width: 350px">
    <q-list bordered v-if="filesData.length > 0">
      
      <q-item clickable v-ripple  v-for="(file, index ) in filesData">
        <q-item-section avatar>
          <QIcon name="upload_file"></QIcon>
        </q-item-section>
        <q-item-section>{{file.name }}</q-item-section>
        <q-item-section side top>
          <q-item-label caption>{{ file.type }}</q-item-label>
        </q-item-section>
      </q-item>
    
      </q-list>
    </div>
    <q-btn v-if="isOverDropZone || filesData.length > 0" color="primary" label="Primary" />

    

  </section>
  <section>
    <h2>Buttons & Icons</h2>
    <div class="text-purple q-gutter-md q-pa-md">
      <q-btn color="primary" label="Primary" />
      <QBtn color="secondary" label="Secondary" />
      <LazyQBtn color="amber" glossy label="Amber" />
      <q-card>
        <q-card-section>
          <div class="text-h6"><a href="https://fonts.google.com/icons?icon.query=file">Material Icons</a></div>
        </q-card-section>
        <q-card-section>
          <QIcon name="thumb_up" size="xs"></QIcon>
          <QIcon name="menu" size="sm"></QIcon>
          <QIcon name="close" size="md"></QIcon>
          <QIcon name="folder" size="lg"></QIcon>
          <QIcon name="folder_open" size="xl"></QIcon>
          <QIcon name="attach_file"></QIcon>
          <QIcon name="upload_file"></QIcon>
          <QIcon name="material_symbols_outlined"></QIcon>
          <QIcon name="supervisor_account"></QIcon>
        </q-card-section>
      </q-card>
      <q-card>
        <q-card-section>
          <div class="text-h6"><a href="https://icons8.com/line-awesome">Line Awesome</a></div>
        </q-card-section>
        <q-card-section>
          <QIcon name="las la-wrench"></QIcon>
          <QIcon name="las la-bicycle" size="xl"></QIcon>

        </q-card-section>
      </q-card>
      
    

    </div>

  </section>
</template>

<style scoped>
.drop-zone {
  width: 300px;
  height: 300px;
  /* background: var(--q-dark-9); */
  border: 1px solid #eee;
}
</style>