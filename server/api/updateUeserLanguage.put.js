export default defineEventHandler(async (event) => {
  // const jwt = await getCookie(event, "token");
  // event.node.req.headers = {};
  // event.node.req.headers["Authorization"] = `Bearer ${jwt}`;
  // event.node.req.headers["client_id"] = useRuntimeConfig().mulesoftClientId;
  // event.node.req.headers["client_secret"] =
  //   useRuntimeConfig().mulesoftClientSecret;
  // const endpoint = useRuntimeConfig().mulesoftEndpoint;
  try {
    // get the user from the event payload
    const user = await readBody(event);
    const response = $fetch(`${endpoint}/user`, {
      method: "PUT",
      headers: event.node.req.headers,
      body: JSON.stringify(user),
    });
    console.log("user", user);
    console.log("response", response);
    return "it probably worked";
  } catch (error) {
    console.error("Error occurred:", error);
  }
});
