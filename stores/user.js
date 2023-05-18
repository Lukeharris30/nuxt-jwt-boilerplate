export const useUser = defineStore("user", {
  state: () => ({
    user: ref(null),
    signinProvider: ref(""),
  }),

  getters: {
    isAuthenticated(state) {
      if (state && state.user) {
        return state.user.verified;
      }
      return false;
    },
  },

  actions: {
    setGoogleUser(googleAuthUser, callback) {
      console.log("setting", googleAuthUser);
      this.user = {
        name: googleAuthUser.value.name,
        email: googleAuthUser.value.email,
        imageUrl: googleAuthUser.value.picture,
        iat: googleAuthUser.value.iat,
        exp: googleAuthUser.value.exp,
        isAdmin: googleAuthUser.value.isAdmin,
        verified: googleAuthUser.value.email_verified,
        userType: "google",
        language: googleAuthUser.value.language,
        spEmail: googleAuthUser.value.email,
        ...googleAuthUser.value,
      };
      sessionStorage.setItem("userState", JSON.stringify(this.user));
    },
    setMsalUser(msalUser) {
      console.log("setting", msalUser);
      this.user = {
        name: msalUser.value.name,
        email: msalUser.value.preferred_username,
        imageUrl: msalUser.value.picture || "",
        iat: msalUser.value.iat,
        exp: msalUser.value.exp,
        isAdmin: true,
        verified: true,
        userType: "msal",
        ...msalUser.value,
      };
      sessionStorage.setItem("userState", JSON.stringify(this.user));
    },
    setUser(user) {
      this.user = user;
    },
    deleteUser() {
      this.user = null;
      sessionStorage.removeItem("userState");
    },
    setSigninProvider(provider) {
      this.signinProvider = provider;
    },
  },
});
