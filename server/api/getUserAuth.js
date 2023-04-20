import {OAuth2Client} from 'google-auth-library'
export default defineEventHandler( async (event) => {
    const body = await readBody(event)
//   verify token
    const client = new OAuth2Client()
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: body,
            audence: process.env.NUXT_GOOGLE_SECRET
        })
        const payload = ticket.getPayload()
        return payload
    }
    
  return  verify().catch(console.error)
  })
