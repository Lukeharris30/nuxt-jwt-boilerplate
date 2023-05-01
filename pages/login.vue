<script  setup>
const {loginWithMicrosoft, msalInstance} = useMsLogin()
const googleLogin = useGoogleLogin()
console.log('msal from component', msalInstance)
</script>

<template>
  <div>
    <h1>Login</h1>
    <div class="q-pa-md q-gutter-sm column-inline items-center">
      <div id="googleButton"></div>
      <q-btn unelevated class="ms-login no-shadow" @click="loginWithMicrosoft"><svg xmlns="http://www.w3.org/2000/svg"
          width="21" height="21" viewBox="0 0 21 21">
          <rect x="1" y="1" width="9" height="9" fill="#f25022" />
          <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
          <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
          <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
        </svg>Login with Microsoft</q-btn>
    </div>
  </div>
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