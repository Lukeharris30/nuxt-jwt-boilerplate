<script setup>
import { useUser } from '../stores/user.js'
const u = useUser()
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-dark text-white" height-hint="98">
      <q-toolbar class="q-pt-lg">
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Supplier Portal
        </q-toolbar-title>
        <q-item v-if="u.user">
          <q-item-section side>
            <q-avatar square size="40px">
              <img :src="u.user.imageUrl" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ u.user.name }}</q-item-label>
            <q-badge v-if="u.user.isAdmin" color="primary">srammie</q-badge>
          </q-item-section>
        </q-item>
      </q-toolbar>
      <q-tabs align="left">
        <q-route-tab to="/home" label="home" />
        <q-route-tab to="/upload" label="upload" />
        <q-route-tab to="/access" label="User Access" />
        <q-route-tab to="/" label="login" />
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
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>Supplier Portal</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

