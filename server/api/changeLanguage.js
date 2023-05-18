export default defineEventHandler(async (event) => {
  const jwt = getCookie(event, "token");
  const user = await readBody(event);
  console.log("jwt", jwt);
  console.log("user", user);
  event.node.req.headers = {};
  event.node.req.headers["Authorization"] = `Bearer ${jwt}`;
  event.node.req.headers["client_id"] = useRuntimeConfig().mulesoftClientId;
  event.node.req.headers["client_secret"] =
    useRuntimeConfig().mulesoftClientSecret;
  const endpoint = useRuntimeConfig().mulesoftEndpoint;
  console.log("endpoint", endpoint);
  try {
    // get the user from the event payload

    const data = await $fetch(`${endpoint}/user`, {
      method: "PUT",
      headers: event.node.req.headers,
      body: user,
    });
    console.log("response", data);

    return data;
  } catch (error) {
    throw error;
  }
});
