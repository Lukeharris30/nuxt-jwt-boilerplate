export default defineEventHandler(async (event) => {
  const jwt = await getCookie(event, "token");
  event.node.req.headers = {};
  event.node.req.headers["Authorization"] = `Bearer ${jwt}`;
  event.node.req.headers["client_id"] = useRuntimeConfig().mulesoftClientId;
  event.node.req.headers["client_secret"] =
    useRuntimeConfig().mulesoftClientSecret;
  const endpoint = useRuntimeConfig().mulesoftEndpoint;
  console.log("file", event.node.req.headers);
  try {
    const response = await $fetch(`${endpoint}/file/home`, {
      headers: event.node.req.headers,
    });
    console.log("file", response);
    return response;
  } catch (error) {
    console.error("Error occurred:", error);
    return error;
  }
});
