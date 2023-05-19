/* eslint-disable no-undef */
import { useUser } from "~/stores/user";
import { useAppStringData } from "~/stores/appStringData";

export const useGoogleLogin = () => {
  const runtimeConfig = useRuntimeConfig();
  const u = useUser();
  const appData = useAppStringData();

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
    const { data, error } = await useFetch("/api/getUserAuth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: token,
    });
    if (error.value) {
      console.error("error", error);
      throw showError({ statusCode: 401, statusMessage: "User Not Found" });
      return;
    }

    u.setGoogleUser(data);

    if (u.user) {
      await navigateTo("/");
    } else await navigateTo("/login");
  }

  const logoutGoogle = () => {
    google.accounts.id.disableAutoSelect();
    u.deleteUser();
    appData.deleteAppData();
  };

  return { logoutGoogle };
};
