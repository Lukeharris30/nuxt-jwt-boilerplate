<script  setup>
import jwt_decode from "jwt-decode";



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

function handleCredentialResponse(response) {
  const token = response.credential
const decoded = jwt_decode(token)
  console.log(decoded)
  // call your backend API here
  // the token can be accessed as: response.credential
}
</script>
<template>
    <div>
      <h1>Login</h1>
      <div id="googleButton"></div>
     
<!-- 
      <AppAlert>
        This is an auto-imported component
      </AppAlert> -->
    </div>
  </template>