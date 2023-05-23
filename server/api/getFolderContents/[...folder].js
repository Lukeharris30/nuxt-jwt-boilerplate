export default defineEventHandler(async (event) => {
  const jwt = await getCookie(event, "token");
  const folder = event.context.params.folder;
  event.node.req.headers = {};
  event.node.req.headers["Authorization"] = `Bearer ${jwt}`;
  event.node.req.headers["client_id"] = useRuntimeConfig().mulesoftClientId;
  event.node.req.headers["client_secret"] =
    useRuntimeConfig().mulesoftClientSecret;
  const endpoint = useRuntimeConfig().mulesoftEndpoint;
  try {
    const response = await $fetch(`${endpoint}/file/list/${folder}`, {
      headers: event.node.req.headers,
    });
    console.log("filesByfolder", response);
    return response;
  } catch (error) {
    console.error("Error occurred:", error);
    return error;
    // throw new Error(error);
  }
});
