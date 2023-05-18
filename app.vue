<script setup>
import { useUser } from "./stores/user.js";
import { useAppStringData } from "./stores/appStringData.js";

const u = useUser();
const appData = useAppStringData();

const loadAppStringData = async () => {
  const { data: appString } = await useFetch("/api/getAppStringData");
  appData.setAppData(appString.value);
};

const userFromStorage = ref(sessionStorage.getItem("userState"));

if (userFromStorage.value) {
  u.setUser(JSON.parse(userFromStorage.value));
  if (u.user) {
    // get the latest appData from user
    loadAppStringData();

    await navigateTo("/");
  } else await navigateTo("/login");
}

u.$subscribe((mutation, state) => {
  if (state.user && u.isAuthenticated) {
    loadAppStringData();
  }
});

const selectedLanguageObject = computed(() => {
  if (!appData.languageOptions || !u.user?.language)
    return { label: "English", value: "en" };
  else
    return appData.languageOptions.find((l) => l.value === u.user?.language)
      .label;
});
const selectedLanguage = ref(selectedLanguageObject.value);

// create a watcher to update the user language
watch(
  () => selectedLanguage.value,
  (newVal) => {
    if (u.user) {
      u.user.language = newVal.value;
      console.log("updating user", u.user.language);
      // make a new api call to update jwt
      const { data, error } = useFetch("./api/updateUserLanguage", {
        method: "PUT",
        body: u.user,
      });
      if (error.value) console.log("client caught error", error);
      if (data.value) {
        console.log("updated user", data);
        u.setUser(data);
      }
    }
  }
);
</script>

<template>
  <q-layout view="hHh lpR fff">
    <q-header class="bg-dark text-white" height-hint="98">
      <q-toolbar class="q-pt-lg">
        <q-toolbar-title>
          <div class="column justify-between">
            <SramLogo color="#e51937" width="200" />
            <div class="q-ml-lg">{{ appData.appData?.pageHeader?.header }}</div>
          </div>
        </q-toolbar-title>
        <div class="column justify-between">
          <q-item v-if="u.user">
            <q-item-section side>
              <q-avatar v-if="u.user?.imageUrl" square size="40px">
                <img :src="u.user.imageUrl" />
              </q-avatar>
              <q-avatar
                v-else
                color="primary"
                text-color="white"
                square
                size="40px"
              >
                <span>{{ u.user.name.slice(0, 1) }}</span>
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="">{{ u.user.name }}</q-item-label>
              <q-badge v-if="u.user.isAdmin" color="primary">srammie</q-badge>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <div v-if="u.user">
                <q-select
                  label-color="white"
                  filled
                  dark
                  bg-color="dark"
                  dense
                  square
                  outlined
                  v-model="selectedLanguage"
                  :options="appData.languageOptions"
                  :label="selectedLanguageObject.label"
                />
              </div>
            </q-item-section>
          </q-item>
        </div>
      </q-toolbar>
      <q-tabs align="left">
        <q-route-tab
          v-for="item in appData.nav"
          :key="item.action"
          :to="item.path"
          :label="item.display"
        />
        <q-route-tab
          to="/login"
          :label="u.isAuthenticated ? appData.logoutLabel : 'login'"
        />
      </q-tabs>
    </q-header>

    <q-page-container>
      <q-page padding>
        <NuxtPage />
      </q-page>
    </q-page-container>

    <q-footer class="q-dark text-white q-pt-lg q-pb-lg">
      <q-toolbar>
        <q-toolbar-title>
          <SramLogo color="#fff" width="100" />
          <div>{{ appData.appData?.pagefooter?.footer }}</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
