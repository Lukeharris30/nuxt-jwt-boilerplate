import jwt_decode from "jwt-decode";
export default defineEventHandler( async (event) => {
  const body = await readBody(event)
  const decoded = jwt_decode(body)
  const user = {
    name: decoded.name,
    imageUrl: decoded.picture,
    isAuthenticated: decoded.email_verified
  }
  return { user } 
  })