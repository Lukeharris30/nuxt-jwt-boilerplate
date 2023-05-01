<script  setup>
import { PublicClientApplication } from "@azure/msal-browser";
import { useUser } from '../stores/user.js'

const runtimeConfig = useRuntimeConfig()
const msalConfig = {
  auth: {
    clientId: runtimeConfig.public.msalSecret, // This is your application's client ID from the Azure portal.
    authority: `https://login.microsoftonline.com/${runtimeConfig.public.msalTenant}`, // Replace "your-tenant-id" with your Azure AD tenant ID.
    navigateToLoginRequestUrl: true
  },
  // cache: {
  //     cacheLocation: "sessionStorage",
  //     storeAuthStateInCookie: false,
  // },
};
const loginRequest = {
  scopes: ["openid", "profile", "User.Read"],
};

const identity = useUser()
const msalInstance = ref('')

async function loginWithMicrosoft() {
  msalInstance.value.loginPopup(loginRequest).then(async (response) => {
    // handle response
    const token = response.idToken
    const { data } = await useFetch('/api/getUserAuthMsal', {
      method: 'POST',
      body: token
    })
    if (data.value) {
      identity.setMsalUser(data)
    }
    if (identity.user?.verified) {
      await navigateTo('/')
    }
    else await navigateTo('/login')
  }).catch((error) => {
    console.log('login error', error)
    // handle error
  });
}

onMounted(() => {
  google.accounts.id.initialize({
    client_id: runtimeConfig.public.googleSecret,
    callback: handleGoogleCredentialResponse, //method to run after user clicks the Google sign in button
  });
  google.accounts.id.renderButton(
    document.getElementById("googleButton"),
    { theme: "outline", size: "large" } // customization attributes
  );

  msalInstance.value = new PublicClientApplication(msalConfig)
})

async function handleGoogleCredentialResponse(response) {
  const token = response.credential
  const { data } = await useFetch('/api/getUserAuth', {
    method: 'POST',
    body: token
  })
  identity.setGoogleUser(data)
  if (identity.user.verified) {
    await navigateTo('/')
  }
  else await navigateTo('/login')
}
</script>

<template>
  <div>
    <h1>Login</h1>
    <div class="q-pa-md q-gutter-sm column-inline items-center">
      <div class="" v-if="!identity.user" id="googleButton"></div>
      <q-btn unelevated class="ms-login no-shadow" @click="loginWithMicrosoft"><svg xmlns="http://www.w3.org/2000/svg"
          width="21" height="21" viewBox="0 0 21 21">
          <title>MS-SymbolLockup</title>
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
  /* position svg */
  position: relative;
  left: -8px;
}
</style>