export const useAppStringData = defineStore("appStringData", {
  state: () => ({
    appData: ref(null),
  }),

  getters: {
    nav: (state) => {
      if (state?.appData) {
        return state.appData.nav
          .map((item) => {
            const action = item.action
              .toLowerCase()
              .replace(" ", "-")
              .replace("action", "");
            return {
              display: item.display,
              action: action,
              path: action === "files" ? "/" : `/${action}`,
            };
          })
          .filter((item) => item.action !== "logout");
      }
    },
    logoutLabel: (state) => {
      const login = state?.appData?.nav?.find(
        (item) => item.action.replace("action", "").toLowerCase() === "logout"
      );
      return login?.display;
    },
    languageOptions: (state) => {
      if (state?.appData) {
        return state.appData?.locales.map((item) => {
          return {
            label: item.display,
            value: item.locale,
          };
        });
      }
    },
  },

  actions: {
    async setAppData(data) {
      this.appData = data;
    },
    deleteAppData() {
      this.appData = null;
    },
  },
});
