module.exports = {
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "prettier",
    "@nuxt/eslint-config",
  ],
  rules: {
    // override/add rules settings here, such as:
    "vue/no-unused-vars": "error",
    "vue/no-undef-properties": ["error"],
    "eslint-disable no-undef": "disable",
  },
};
