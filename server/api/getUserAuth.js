import { OAuth2Client } from "google-auth-library";
import jwt_decode from "jwt-decode";
import {getUserApi} from "~/helpers/callUserApi";

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
  const cookie = getCookie(event, "token");
  let user = {};
  // read cookie expiration
  // if(cookie) {
  //   console.log('cookie', cookie)
  //   // decode jwt cookie
  //   const decoded = jwt_decode(cookie)
  //   console.log('decoded', decoded)
  //   // if close to expiration, refresh token
  //   if(decoded.exp - Date.now() < 1000 * 60 * 60 * 24) {
  //     let newToken = $fetch('/api/refreshToken', {
  //       method: 'POST',
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({token: cookie})
  //     })
  //   }
  // else get user jwt from mulesoft
  // else {
  if (validGoogleUser) {
    let { token } = await $fetch(
      "https://api-stage.sram.com/exp-supplier-portal-api-dev/api/v1/authorize/jwitzke@sram.com",
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
 
  }
  mulesoftUser = jwt_decode(mulesoftToken);

  const mulsoftUserObject = await getUserApi(mulesoftToken, mulesoftUser.email, useRuntimeConfig().mulesoftClientId, useRuntimeConfig().mulesoftClientSecret)
  console.log('mulsoftUserObject', mulsoftUserObject)

  if (mulesoftToken && validGoogleUser) {
    user = {
      ...validGoogleUser,
      ...mulesoftUser,
      ...mulsoftUserObject[0]
    };
  }

  // set httpOnly cookie with token
  if (user) {
    setCookie(event, "token", mulesoftToken, {
      httpOnly: true,
      secure: true,
      maxAge: mulesoftUser.exp,
    });
  }

  return user;

  // }

  // }
});
