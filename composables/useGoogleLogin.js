import { useUser } from "~/stores/user";

export const useGoogleLogin = () => {
  const runtimeConfig = useRuntimeConfig();
  const u = useUser();

  onMounted(() => {
    google.accounts.id.initialize({
      client_id: runtimeConfig.public.googleSecret,
      callback: handleGoogleCredentialResponse, //method to run after user clicks the Google sign in button
    });
    google.accounts.id.renderButton(
      document.getElementById("googleButton"),
      { theme: "outline", size: "large" } // customization attributes
    );
  });

  async function handleGoogleCredentialResponse(response) {
    const token = response.credential;
    const { data } = await useFetch("/api/getUserAuth", {
      method: "POST",
      headers: { "Content-Type": "application/json" ,
                "Authorization": `Bearer ${token}`
              },
      // body: token,
    });
    u.setGoogleUser(data);
    if (u.user.verified) {
      await navigateTo("/");
    } else await navigateTo("/login");
  }
};
