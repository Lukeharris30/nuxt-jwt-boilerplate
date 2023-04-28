<script  setup>
import { PublicClientApplication } from "@azure/msal-browser";

import {useUser} from '../stores/user.js'

const appConfig = useAppConfig()
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
  msalInstance.value.loginPopup(loginRequest).then( async (response) => {
    console.log('login response', response)
    // handle response
    const token = response.idToken
    const { data } = await useFetch('/api/getUserAuthMsal', {
          method: 'POST',
          body: token
    })

    console.log('data', data.value)
    if(data.value){
      identity.setMsalUser(data)
    }
    
    if(identity.user?.verified){
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
  if(identity.user.verified){
    await navigateTo('/')
  }
  else await navigateTo('/login')
}



</script>
<template>
    <div>
      <h1>Login</h1>
      <div v-if="!identity.user" id="googleButton"></div>
      <button @click="loginWithMicrosoft">MSAl sucks</button>
    </div>
</template>

<style>

</style>