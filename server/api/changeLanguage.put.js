export default defineEventHandler(async (event) => {
  const jwt = await getCookie(event, "token");
  const user = await readBody(event);
  let mulesoftUser = {};
  event.node.req.headers = {};
  event.node.req.headers["Authorization"] = `Bearer ${jwt}`;
  event.node.req.headers["client_id"] = useRuntimeConfig().mulesoftClientId;
  event.node.req.headers["client_secret"] =
    useRuntimeConfig().mulesoftClientSecret;
  const endpoint = useRuntimeConfig().mulesoftEndpoint;
  console.log("calling mulesoft");
  try {
    $fetch(`${endpoint}/user`, {
      method: "PUT",
      headers: event.node.req.headers,
      body: user,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return error;
  }

  //   get a new jwt
  const mulesoftToken = await getUserJwt(user.email);

  // set httpOnly cookie with token
  if (mulesoftToken) {
    console.log("setting cookie");
    setCookie(event, "token", mulesoftToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      // maxAge: mulsoftToken.exp,
    });

    // get mulesoft user
    const mulesoftUser = getUserApi(
      mulesoftToken,
      user.email,
      useRuntimeConfig().mulesoftClientId,
      useRuntimeConfig().mulesoftClientSecret
    );
    // return success message
    return {
      message: "Language changed successfully",
      data: mulesoftToken,
    };
  }
});
