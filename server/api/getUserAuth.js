import { OAuth2Client } from "google-auth-library";
import jwt_decode from "jwt-decode";
import { getUserApi } from "~/helpers/callUserApi";

// Verify token function
async function verifyToken(idToken) {
  const client = new OAuth2Client();
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.NUXT_GOOGLE_SECRET,
    });
    const payload = ticket.getPayload();
    return payload;
  } catch (error) {
    console.error("Error while verifying token:", error);
    throw error;
  }
}

// Event handler
export default defineEventHandler(async (event) => {
  // Verify token
  const idToken = await readBody(event);
  let mulesoftToken = "";
  let mulesoftUser = {};
  const validGoogleUser = await verifyToken(idToken);
  let user = {};

  if (validGoogleUser) {
    try {
      let { token } = await $fetch(
        `${useRuntimeConfig().mulesoftEndpoint}/authorize/${
          // validGoogleUser.email || 
          'jwitzke@sram.com'}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            client_id: useRuntimeConfig().mulesoftClientId,
            client_secret: useRuntimeConfig().mulesoftClientSecret,
          },
        }
      );
      mulesoftToken = token;
    } catch (error) {
      // 404 status code indicates Not Found
      if (error.response && error.response.status === 404) {
        throw new Error('User not found. Please provide a valid user.');
      } else {
        // re-throw the error if it's not a 404
        throw error;
      }
    }
  } else {
    throw new Error('Invalid Google user. Please provide a valid Google user.');
  }
  
  mulesoftUser = jwt_decode(mulesoftToken);

  const mulsoftUserObject = await getUserApi(
    mulesoftToken,
    mulesoftUser.email,
    useRuntimeConfig().mulesoftClientId,
    useRuntimeConfig().mulesoftClientSecret
  );

  if (mulesoftToken && validGoogleUser) {
    user = {
      ...validGoogleUser,
      ...mulesoftUser,
      ...mulsoftUserObject,
    };
  }

  // set httpOnly cookie with token
  if (user && mulesoftToken) {
    setCookie(event, "token", mulesoftToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: mulesoftUser.exp,
    });
  }

  return user;
});
