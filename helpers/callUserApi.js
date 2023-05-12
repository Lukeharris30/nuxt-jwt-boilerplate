export const getUserApi = async (jwt, userEmail, clientId, clientSecret) => {
    // call mulesoft api to get user info
    // const runtimeConfig = useRuntimeConfig();
    const headers = { 
        "Content-Type": "application/json", "Authorization": `Bearer ${jwt}` ,
        client_id: clientId,
        client_secret: clientSecret
    }
    console.log(headers)
    console.log('url', `${useRuntimeConfig().mulesoftEndpoint}/user/${userEmail}`)
    const data = await $fetch(`${useRuntimeConfig().mulesoftEndpoint}/user/${userEmail}`, {
        method: 'GET',
        // bearer token auth
        headers
    })
    console.log('data', data)
    return data
}
