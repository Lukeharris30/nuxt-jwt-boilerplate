import jwt from "jsonwebtoken";
import JwksRsa from "jwks-rsa";

// Configure the jwksClient to retrieve the signing keys from Microsoft's JWKS endpoint
const client = JwksRsa({
  jwksUri: "https://login.microsoftonline.com/common/discovery/keys",
});

// Function to get the signing key based on the key ID (kid) from the JWT header
function getSigningKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      console.error('Error getting signing key:', err);
      callback(err); // Pass the error as the first argument
      return;
    }

    const signingKey = (key && key.publicKey) || key.rsaPublicKey;
    callback(null, signingKey); // Pass null as the first argument if there's no error
  });
}

// Function to verify the JWT
function verifyJWT(jwtToken) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      jwtToken,
      getSigningKey,
      {
        algorithms: ["RS256"],
        audience: process.env.NUXT_MICROSOFT_CLIENT_ID, // Replace with your app's client ID
        issuer: `https://login.microsoftonline.com/${process.env.NUXT_MICROSOFT_TENANT_ID}/v2.0`, // Replace TENANT_ID with your Azure AD tenant ID
      },
      // forces async behavior
      (err, decoded) => {
        if (err) {
          console.error("JWT verification failed:", err);
          reject(err);
        } else {
          // console.log("JWT successfully verified:", decoded);
          resolve(decoded);
        }
      }
    );
  });
}

export default defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, 'Authorization').replace('Bearer ', '');
    const user = await verifyJWT(token);
    return user;
  } catch (err) {
    console.error("Error:", err);
    // Handle the error, return an error response or throw an exception
    return err
  }
});
