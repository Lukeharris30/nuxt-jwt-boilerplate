export const getUserApi = async (jwt, clientId, clientSecret) => {
  // call mulesoft api to get user info
  // const runtimeConfig = useRuntimeConfig();
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt}`,
    client_id: clientId,
    client_secret: clientSecret,
  };
  console.log(headers);

  const data = await $fetch(`${useRuntimeConfig().mulesoftEndpoint}/user`, {
    method: "GET",
    // bearer token auth
    headers,
  });

  return data;
};
