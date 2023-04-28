import jwt from  'jsonwebtoken';
import JwksRsa from 'jwks-rsa'; 

// Configure the jwksClient to retrieve the signing keys from Microsoft's JWKS endpoint
const client = JwksRsa({
  jwksUri: 'https://login.microsoftonline.com/common/discovery/keys'
});

// Function to get the signing key based on the key ID (kid) from the JWT header
function getSigningKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    console.log('key', key)
    const signingKey = key && key.publicKey || key.rsaPublicKey;
    console.log('signinkey',signingKey)
    callback(null, signingKey);
  });
}

// Function to verify the JWT
function verifyJWT(jwtToken) {
    return new Promise((resolve, reject) => {
      jwt.verify(jwtToken, getSigningKey, {
        algorithms: ['RS256'],
        audience: process.env.NUXT_MICRSOFT_CLIENT_ID, // Replace with your app's client ID
        issuer: `https://login.microsoftonline.com/${process.env.NUXT_MICROSOFT_TENANT_ID}/v2.0` // Replace TENANT_ID with your Azure AD tenant ID
      }, (err, decoded) => {
        if (err) {
          console.error('JWT verification failed:', err);
          reject(err);
        } else {
          console.log('JWT successfully verified:', decoded);
          resolve(decoded);
        }
      });
    });
  }

// Replace with the JWT token received from the client
export default defineEventHandler( async (event) => {
    try {
        const token = await readBody(event);
        const user = await verifyJWT(token);
        console.log('user', user);
        return user;
      } catch (err) {
        console.error('Error:', err);
        // Handle the error, return an error response or throw an exception
      }
})

