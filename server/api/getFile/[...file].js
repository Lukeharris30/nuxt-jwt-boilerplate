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
    const blob = await $fetch.raw(`${endpoint}/file/${file}`, {
      headers: event.node.req.headers,
    });
    // const arrayBuffer = await blob.arrayBuffer();
    // let buffer;
    // try {
    //   buffer = Buffer.from(arrayBuffer, "base64");
    // } catch (error) {
    //   console.error("Failed to decode as base64:", error);
    //   // try decoding as UTF-8
    //   try {
    //     buffer = Buffer.from(arrayBuffer, "utf8");
    //   } catch (error) {
    //     console.error("Failed to decode as UTF-8:", error);
    //     // try decoding as binary data
    //     buffer = Buffer.from(arrayBuffer);
    //   }
    // }

    // set headers to force download
    // setResponseHeader(
    //   event,
    //   "Content-Disposition",
    //   `attachment; filename="${file}"`
    // );
    // // set the Content-Type header to the correct MIME type
    // setResponseHeader(event, "Content-Type", "application/pdf");

    const returnHeaders = await getResponseHeaders(event);
    console.log("returnHeaders", returnHeaders);
    // setResponseHeaders(res, blob);
    // event.node.res.setHeader(
    //   "Content-Type",
    //   getRequestHeaders(blob, "Content-Type")
    // );
    // event.node.res.setHeader(
    //   "Content-Disposition",
    //   blob.headers.get("Content-Disposition")
    // );
    // event.node.res.setHeader(
    //   "Content-Length",
    //   blob.headers.get("Content-Length")
    // );
    return blob;
    // return the file as a blob

    return response;
  } catch (error) {
    console.error("Error occurred:", error);
    return error;
    // throw new Error(error);
  }
});
