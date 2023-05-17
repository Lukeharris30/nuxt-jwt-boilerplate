<script setup>
import { useUser } from "../stores/user.js";
const { loginWithMicrosoft, msalInstance, msalLogout } = useMsLogin();
const { logoutGoogle } = useGoogleLogin();
const u = useUser();
</script>

<template>
  <section>
    <div v-show="!u.user">
      <div class="q-pa-md q-gutter-sm column-inline items-center">
        <div id="googleButton"></div>
        <q-btn
          unelevated
          class="ms-login no-shadow"
          @click="loginWithMicrosoft"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 21 21"
          >
            <rect x="1" y="1" width="9" height="9" fill="#f25022" />
            <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
            <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
            <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
          </svg>
          <span>Login with Microsoft</span>
        </q-btn>
      </div>
    </div>
    <div v-show="u.user" class="q-pa-md q-gutter-sm column-inline items-center">
      <q-btn v-if="u?.user?.userType === 'msal'" @click="msalLogout">
        Logout
      </q-btn>
      <q-btn
        v-show="u?.user?.userType === 'google'"
        id="logoutGoogle"
        class="g_id_signout"
        @click="logoutGoogle"
      >
        Logout
      </q-btn>
    </div>
  </section>
</template>

<style>
.ms-login {
  box-shadow: none;
  border: 1px solid #c8c8c8;
}
.ms-login svg {
  position: relative;
  left: -8px;
}
</style>
