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
    // console.log(arrayBuffer);
    // const buffer = Buffer.from(arrayBuffer);

    //  typed resprentation of the array buffer, a unit8array
    const typedArray = new Uint8Array(arrayBuffer);
    const blob = new Blob([typedArray.buffer]);
    console.log(typedArray);
    setResponseHeader(
      event,
      "Content-Type",
      "application/octet-stream, charset=utf-8"
    );
    // setting this to chunked
    // breaks the download, the server thinks it succeede with 200 but the client  times out
    // binary allows it to download but the file is corrupted
    // fix it by setting the content length?

    // setResponseHeader(event, "Transfer-Encoding", "binary");
    setResponseHeader(event, "Content-Disposition", `attachment;`);
    // setResponseHeader(event, "Content-Length", typedArray.length);
    return typedArray;
  } catch (error) {
    console.error("Error occurred: getting file", error);
    throw createError(error);
  }
});
