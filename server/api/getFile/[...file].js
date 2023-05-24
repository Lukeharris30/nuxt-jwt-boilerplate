export default defineEventHandler(async (event) => {
  const jwt = await getCookie(event, "token");
  const file = event.context.params.file;
  event.node.req.headers = {};
  event.node.req.headers["Authorization"] = `Bearer ${jwt}`;
  event.node.req.headers["client_id"] = useRuntimeConfig().mulesoftClientId;
  event.node.req.headers["client_secret"] =
    useRuntimeConfig().mulesoftClientSecret;
  const endpoint = useRuntimeConfig().mulesoftEndpoint;
  try {
    const blob = await $fetch(`${endpoint}/file/${file}`, {
      headers: event.node.req.headers,
    });
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer, "base64");
    return buffer;
    // return the file as a blob
    return response;
  } catch (error) {
    console.error("Error occurred:", error);
    return error;
    // throw new Error(error);
  }
});
