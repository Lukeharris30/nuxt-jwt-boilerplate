import jwt_decode from "jwt-decode";
export default defineEventHandler((event) => {
    console.log(event)
    return {
      api: 'works',
      event: event.context
    }
  })