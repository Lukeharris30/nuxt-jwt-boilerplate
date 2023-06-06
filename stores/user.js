export const useUser = defineStore("user", {
  state: () => ({
    user: ref(null),
    signinProvider: ref(""),
  }),

  getters: {
    isAuthenticated(state) {
      if (state && state.user) {
        return !!state.user.email;
      }
      return false;
    },
  },

  actions: {
    setGoogleUser(googleAuthUser) {
      console.log("setting google user", googleAuthUser);
      this.user = {
        email: googleAuthUser.value.email,

        ...googleAuthUser.value,
      };
      sessionStorage.setItem("userState", JSON.stringify(this.user));
      sessionStorage.setItem(
        "signinProvider",
        JSON.stringify(this.signinProvider)
      );
    },
    setMsalUser(msalUser) {
      console.log("settingMsal user", msalUser);
      this.user = {
        email: msalUser.value.preferred_username,
        ...msalUser.value,
      };
      sessionStorage.setItem("userState", JSON.stringify(this.user));
      sessionStorage.setItem(
        "signinProvider",
        JSON.stringify(this.signinProvider)
      );
    },
    setUser(user) {
      console.log("setting user", this.user);
      this.user = user;
      sessionStorage.setItem("userState", JSON.stringify(user));
    },
    deleteUser() {
      this.user = null;
      sessionStorage.removeItem("userState");
      sessionStorage.removeItem("signinProvider");
    },
    setSigninProvider(provider) {
      this.signinProvider = provider;
    },
  },
});
