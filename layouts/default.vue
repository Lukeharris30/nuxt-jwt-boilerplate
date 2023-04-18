  
<script setup>

const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)
  
function toggleLeftDrawer () {
    leftDrawerOpen.value = !leftDrawerOpen.value
}

function toggleRightDrawer () {
    rightDrawerOpen.value = !rightDrawerOpen.value
}

</script>

<template>
    <q-layout view="hHh lpR fFf">
  
      <q-header  class="bg-dark text-white" height-hint="98">
        <q-toolbar>
          <q-btn dense flat  icon="menu" @click="toggleLeftDrawer" />
  
          <q-toolbar-title>
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
            </q-avatar>
           Supplier Portal
          </q-toolbar-title>
  
          <q-btn dense flat  icon="menu" @click="toggleRightDrawer" />
        </q-toolbar>
  
        <q-tabs align="left">
          
          <q-route-tab to="/" label="home" />
          <q-route-tab to="/about" label="about" />
          <q-route-tab to="/login" label="login" />
        </q-tabs>
      </q-header>
  
      <q-drawer v-model="leftDrawerOpen" side="left" bordered>
        <!-- drawer content -->
        <h2>On the Left</h2>
      </q-drawer>
  
      <q-drawer v-model="rightDrawerOpen" side="right" bordered>
        <!-- drawer content -->
        <h2>On the Right</h2>
      </q-drawer>
  
      <q-page-container>
        <!-- <router-view /> -->
        <q-page padding>
            <slot></slot>
        </q-page>
        
      </q-page-container>
  
      <q-footer class="q-dark text-white">
        <q-toolbar>
          <q-toolbar-title>
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
            </q-avatar>
            <div>Supplier Portal</div>
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>
  
    </q-layout>
  </template>

