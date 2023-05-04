import { PublicClientApplication } from "@azure/msal-browser";
import { useUser } from '~/stores/user'


export const useMsLogin = () => {
    const runtimeConfig = useRuntimeConfig()
    const msalConfig = {
        auth: {
        clientId: runtimeConfig.public.msalSecret, // This is your application's client ID from the Azure portal.
        authority: `https://login.microsoftonline.com/${runtimeConfig.public.msalTenant}`, // Replace "your-tenant-id" with your Azure AD tenant ID.
        navigateToLoginRequestUrl: true
        }
    };

    const loginRequest = {
        scopes: ["openid", "profile", "User.Read"],
    };

    const u = useUser()
    const msalInstance = ref(null)
    onMounted(() => {
      msalInstance.value = new PublicClientApplication(msalConfig)
      // console.log('msalInstance', msalInstance.value)
    })
  
    async function loginWithMicrosoft() {
        msalInstance.value.loginPopup(loginRequest)
        .then(async (response) => {
          // handle response
          const token = response.idToken
          const { data } = await useFetch('/api/getUserAuthMsal', {
            method: 'POST',
            headers: { "Content-Type": "application/json" ,
            "Authorization": `Bearer ${token}`
          },
            body: token,
          })
          if (data.value) {
            u.setMsalUser(data)
          }
          if (u.user?.verified) {
            await navigateTo('/')
          }
          else await navigateTo('/login')
        })
        .catch((error) => {
            console.log('login error', error)
            // handle error
        });
    }

    return{
        loginWithMicrosoft,
        msalInstance,
    }
   
}
