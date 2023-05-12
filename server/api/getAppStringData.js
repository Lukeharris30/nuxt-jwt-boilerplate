// call mulesoft app data enpoints
export default defineEventHandler(async (event) => {
    const header = getHeaders(event)
    console.log('header', header)
    const nav = await $fetch(`${useRuntimeConfig().mulesoftEndpoint}/content/actions`,
    {
        headers: header
    }
    )

    return nav
})