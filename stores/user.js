export const useUser = defineStore('user', {
  state: () => ({
    user: ref(null)
  }),

  getters: {
  },

  actions: {
    setGoogleUser(googleAuthUser) {
      console.log('setting', googleAuthUser)
      this.user = {
        name: googleAuthUser.value.name,
        email: googleAuthUser.value.email,
        imageUrl: googleAuthUser.value.picture,
        iat: googleAuthUser.value.iat,
        exp: googleAuthUser.value.exp,
        isAdmin: true,
        verified: googleAuthUser.value.email_verified
      }
    }
  }
})