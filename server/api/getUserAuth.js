import { OAuth2Client } from 'google-auth-library';

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
    console.error('Error while verifying token:', error);
    throw error;
  }
}

// Event handler
export default defineEventHandler(async (event) => {
  // const idToken = await readBody(event);
  // console.log('auth', event.node.req)
  const header = await getHeader(event, 'Authorization');
  const idToken = header.replace('Bearer ', '')
  // Verify token and return the user
  return verifyToken(idToken);
});