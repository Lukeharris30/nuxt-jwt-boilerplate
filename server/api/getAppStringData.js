export default defineEventHandler(async (event) => {
  const jwt = await getCookie(event, "token");
  event.node.req.headers = {};
  event.node.req.headers["Authorization"] = `Bearer ${jwt}`;
  event.node.req.headers["client_id"] = useRuntimeConfig().mulesoftClientId;
  event.node.req.headers["client_secret"] =
    useRuntimeConfig().mulesoftClientSecret;
  const endpoint = useRuntimeConfig().mulesoftEndpoint;
  try {
    let [nav, pageFooter, pageHeader, locales] = await Promise.all([
      $fetch(`${endpoint}/content/actions`, {
        headers: event.node.req.headers,
      }),
      $fetch(`${endpoint}/content/footer`, { headers: event.node.req.headers }),
      $fetch(`${endpoint}/content/header`, { headers: event.node.req.headers }),
      $fetch(`${endpoint}/content/locales`, {
        headers: event.node.req.headers,
      }),
    ]);
    console.log({ nav, pageHeader, pageFooter, locales });
    return { nav, pageHeader, pageFooter, locales };
  } catch (error) {
    console.error("Error occurred:", error);
  }
});
