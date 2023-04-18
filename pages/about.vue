<script setup>
const runtimeConfig = useRuntimeConfig()

const dropZoneRef = ref('')

function onDrop(files){
  console.log('dropped', files)
}

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)
</script>

<template>
   <h1>About</h1>
  <section>
    <h2>DropZone</h2>
        <div ref="dropZoneRef" class="drop-zone flex-center flex">
          <div class="flex-center flex column">
          <QIcon name="upload_file" size="xl"></QIcon>
          <div class="">Drop Files</div>
        </div>
        </div>
  </section>
    <section>
      <div class="text-purple q-gutter-md q-pa-md">
        <h2>Icons</h2>
        <q-btn color="primary" label="Primary" />
        <QBtn color="secondary" label="Secondary" />
        <LazyQBtn color="amber" glossy label="Amber" />
        <h3><a href="https://fonts.google.com/icons?icon.query=file">Material Icons</a></h3>
        <QIcon name="thumb_up" size="xs"></QIcon>
        <QIcon name="menu" size="sm"></QIcon>
        <QIcon name="close" size="md"></QIcon>
        <QIcon name="folder" size="lg"></QIcon>
        <QIcon name="folder_open" size="xl"></QIcon>
        <QIcon name="attach_file"></QIcon>
        <QIcon name="upload_file"></QIcon>
        <QIcon name="draft"></QIcon>
        <QIcon name="supervisor_account"></QIcon>
        <h3><a href="https://icons8.com/line-awesome">Line Awesome</a></h3>
        <QIcon name="las la-wrench"></QIcon>
        <QIcon name="las la-bicycle" size="xl"></QIcon>
     
      </div>
      
    </section>
</template>

<style scoped>
.drop-zone{
  width: 300px;
  height: 300px;
  background: var(--q-dark);
  border: 1px solid #fff;
}
.file-drop{

}
</style>