export default defineEventHandler(async (event) => {
  const jwt = getCookie(event, "token");
  const file = event.context.params.file;

  event.node.req.headers = {};
  event.node.req.headers["Authorization"] = `Bearer ${jwt}`;
  event.node.req.headers["client_id"] = useRuntimeConfig().mulesoftClientId;
  event.node.req.headers["client_secret"] =
    useRuntimeConfig().mulesoftClientSecret;
  const endpoint = useRuntimeConfig().mulesoftEndpoint;

  try {
    const arrayBuffer = await $fetch(`${endpoint}/file/${file}`, {
      headers: event.node.req.headers,
      responseType: "arrayBuffer",
    });

    const data = new Uint8Array(arrayBuffer);
    setResponseHeader(event, "Content-Type", "application/octet-stream");
    setResponseHeader(
      event,
      "Content-Disposition",
      `attachment; fileName=${file}`
    );
    setResponseHeader(event, "Content-Length", data.length);
    return data;
  } catch (error) {
    console.error("Error occurred: getting file", error);
    throw createError(error);
  }
});
