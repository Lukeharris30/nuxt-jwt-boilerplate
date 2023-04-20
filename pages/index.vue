<script  setup>
import { Http2Server } from 'http2';
import {useCounter} from '../stores/counter.js'
const user = ref('')
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
    // google.accounts.id.prompt(); // also display the One Tap dialog
})

async function handleCredentialResponse(response) {
  const token = response.credential
  const { data } = await await useFetch('/api/getUserAuth', {
        method: 'POST',
        body: token
    })
  user.value = data
  // call your backend API here
  // the token can be accessed as: response.credential
}

const counter = useCounter()


</script>
<template>
  <div>
    <button @click="counter.increment()">increment</button>
    {{ counter.n }}
  </div>
  <pre>{{ user }}</pre>
    <div>
      <h1>Login</h1>
      <div v-if="!user" id="googleButton"></div>
     
    </div>
  </template>