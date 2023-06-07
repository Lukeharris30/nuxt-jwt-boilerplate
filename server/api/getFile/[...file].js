// import { setResponseHeaders, getResponseHeaders } from "h3";
import * as fs from "fs";

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
    const arrayBuffer = await $fetch(`${endpoint}/file/${file}`, {
      headers: event.node.req.headers,
      responseType: "arrayBuffer",
    });

    // const returnedResponseHeaders = getResponseHeaders(event);
    // const responseHeaders = setResponseHeaders(
    //   event,
    //   "Content-Type",
    //   "application/pdf"
    // );
    // console.log("responseHeaders", responseHeaders);
    // console.log("getResponseHeaders", returnedResponseHeaders);
    console.log("arraybuffer", arrayBuffer);

    const data = new Uint8Array(arrayBuffer);
    fs.writeFileSync("test.pdf", data);
    console.log("data", data);
    // let responseEvent = createEvent(null, arrayBuffer);
    // sendStream(responseEvent, arrayBuffer);
    return data;
  } catch (error) {
    console.error("Error occurred: getting file", error);
    throw createError(error);
  }
});
