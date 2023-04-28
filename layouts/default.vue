<script setup>

import { useUser } from '../stores/user.js'

const u = useUser()
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-dark text-white" height-hint="98">
      <q-toolbar class="q-pt-lg ">
        <q-toolbar-title >
          <div >
            <!-- <q-badge color="white" text-color="black" > -->
            <SramLogo color="#e51937" width="200" />
            <!-- </q-badge> -->
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
        
        <q-route-tab v-if="u.isAuthenticated" to="/" label="home" />
        <q-route-tab v-if="u.isAuthenticated" to="/upload" label="upload" />
        <q-route-tab v-if="u.isAuthenticated" to="/access" label="User Access" />
        <q-route-tab v-if="u.isAuthenticated" to="/folders" label="folders" />
        <q-route-tab v-if="!u.isAuthenticated" to="/login" label="login" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <q-page padding>
        <slot></slot>
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

