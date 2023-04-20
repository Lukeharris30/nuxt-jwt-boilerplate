<script  setup>
import {useUser} from '../stores/user.js'
const identity = useUser()
const runtimeConfig = useRuntimeConfig()

onMounted(() => {
    google.accounts.id.initialize({
      client_id: runtimeConfig.googleSecret,
      callback: handleCredentialResponse, //method to run after user clicks the Google sign in button
    });
    google.accounts.id.renderButton(
      document.getElementById("googleButton"),
      { theme: "outline", size: "large" } // customization attributes
    );
})

async function handleCredentialResponse(response) {
  const token = response.credential
  const { data } = await useFetch('/api/getUserAuth', {
        method: 'POST',
        body: token
    })
  identity.setGoogleUser(data)
}



</script>
<template>
    <div>
      <h1>Login</h1>
      <div v-if="!identity.user" id="googleButton"></div>
     
    </div>
</template>