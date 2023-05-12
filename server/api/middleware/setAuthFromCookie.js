export default defineEventHandler((event) => {
    console.log('setAuthFromCookie')
    const cookie = getCookie(event, "token");
    event.node.req.headers['Authorization'] = `Bearer ${cookie}`
})