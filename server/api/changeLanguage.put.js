import jwt_decode from "jwt-decode";
export default defineEventHandler(async (event) => {
  const jwt = await getCookie(event, "token");
  const user = await readBody(event);
  event.node.req.headers = {};
  event.node.req.headers["Authorization"] = `Bearer ${jwt}`;
  event.node.req.headers["client_id"] = useRuntimeConfig().mulesoftClientId;
  event.node.req.headers["client_secret"] =
    useRuntimeConfig().mulesoftClientSecret;
  const endpoint = useRuntimeConfig().mulesoftEndpoint;

  try {
    await $fetch(`${endpoint}/user`, {
      method: "PUT",
      headers: event.node.req.headers,
      body: user,
    });

    // get a new jwt
    const mulesoftToken = await getUserJwt(user.email);
    // get mulesoft user info form token
    const { exp } = jwt_decode(mulesoftToken);

    // set httpOnly cookie with token
    if (mulesoftToken) {
      setCookie(event, "token", mulesoftToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: exp,
      });

      // return success message
      return {
        message: "Language changed successfully",
        data: mulesoftToken,
      };
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return error;
  }
});
