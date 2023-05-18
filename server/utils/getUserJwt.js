export const getUserJwt = async (userEmail) => {
  // Get user JWT frm Mulesoft
  try {
    let { token } = await $fetch(
      `${useRuntimeConfig().mulesoftEndpoint}/authorize/${userEmail}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          client_id: useRuntimeConfig().mulesoftClientId,
          client_secret: useRuntimeConfig().mulesoftClientSecret,
        },
      }
    );

    return token;
  } catch (error) {
    // 404 status code indicates Not Found
    if (error.response && error.response.status === 404) {
      throw new Error("User not found. Please provide a valid user.");
    } else {
      // re-throw the error if it's not a 404
      throw error;
    }
  }
};
