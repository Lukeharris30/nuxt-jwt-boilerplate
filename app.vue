<script setup>
import { useUser } from './stores/user.js'
import { useAppStringData } from './stores/appStringData.js'

const u = useUser()
const appData = useAppStringData()

const loadAppStringData = async () => {
  const {data: appString} = await useFetch("/api/getAppStringData")
  appData.setAppData(appString.value)
}

u.$subscribe((mutation, state) => {
  if(state.user && u.isAuthenticated) {
        loadAppStringData()
  }
})


</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-dark text-white" height-hint="98">
      <q-toolbar class="q-pt-lg ">
        <q-toolbar-title >
          <div >
            <SramLogo color="#e51937" width="200" />
            <span class="q-ml-lg ">Supplier Portal</span>
        </div>
        </q-toolbar-title>
        <q-item v-if="u.user">
          <q-item-section side>
            <q-avatar v-if="u.user?.imageUrl" square size="40px">
              <img :src="u.user.imageUrl" />
            </q-avatar>
            <q-avatar v-else color="primary" text-color="white" square size="40px">
              <span>{{ u.user.name.slice(0,1) }}</span>
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="">{{ u.user.name }}</q-item-label>
            <q-badge v-if="u.user.isAdmin" color="primary">srammie</q-badge>
          </q-item-section>
        </q-item>
      </q-toolbar>
      <q-tabs align="left">
            <q-route-tab v-for="item in appData.nav" :key="item.action"  :to="item.path" :label="item.display" />
            <q-route-tab  to="/login" :label= "u.isAuthenticated ? appData.logoutLabel : 'login'" />
        </q-tabs>
    </q-header>
    
    <q-page-container>
      <q-page padding>
        <NuxtPage/>
      </q-page>
    </q-page-container>

    <q-footer class="q-dark text-white q-pt-lg q-pb-lg">
      <q-toolbar>
        <q-toolbar-title>
          <SramLogo color="#fff" width="100" />
          <div>Supplier Portal</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

