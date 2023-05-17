export default defineEventHandler((event) => {
  const jwt = getCookie(event, "token");
  // event.node.req.headers = {}
  // check the referer is not /login
  if (event.node.req.headers.referer !== "http://localhost:3000/login") {
    // if jwt exists, set auth header
    event.node.req.headers = {};
    event.node.req.headers["Authorization"] = `Bearer ${jwt}`;
    // event.node.req.headers['Content-Type'] = 'application/json's
    event.node.req.headers["client_id"] = useRuntimeConfig().mulesoftClientId;
    event.node.req.headers["client_secret"] =
      useRuntimeConfig().mulesoftClientSecret;
    // console.log('middleware', event.node.req.headers)
  }
});
