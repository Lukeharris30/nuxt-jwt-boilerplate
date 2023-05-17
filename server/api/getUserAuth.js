/* eslint-disable no-undef */
import { OAuth2Client } from "google-auth-library";
import jwt_decode from "jwt-decode";

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
  let mulesoftToken = "";
  let mulesoftUser = {};
  let user = {};

  // get token
  const idToken = await readBody(event);

  // verify token
  const validGoogleUser = await verifyToken(idToken);

  // get jwt from mulesoft
  if (validGoogleUser) {
    mulesoftToken = await getUserJwt(validGoogleUser.email);
  } else {
    throw new Error("Invalid Google user. Please provide a valid Google user.");
  }

  // get mulesoft user info form token
  mulesoftUser = jwt_decode(mulesoftToken);

  // fetch mulesoft user info
  const mulsoftUserObject = await getUserApi(
    mulesoftToken,
    mulesoftUser.email,
    useRuntimeConfig().mulesoftClientId,
    useRuntimeConfig().mulesoftClientSecret
  );

  // create user object with the three sources of data
  if (mulesoftToken && validGoogleUser) {
    user = {
      ...validGoogleUser,
      ...mulesoftUser,
      ...mulsoftUserObject,
    };
  }

  // set httpOnly cookie with token
  if (mulesoftToken) {
    setCookie(event, "token", mulesoftToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: mulesoftUser.exp,
    });
  }

  return user;
});
