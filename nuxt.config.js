export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - Specialized Community Lending",
    title: "Specialized Community Lending",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  publicRuntimeConfig: {
    adminSettingsService: process.env.ADMIN_SETTINGS,
    tokenService: process.env.TOKEN_SERVICE,
    sessionsService: process.env.SESSION_SERVICE,
    profiledApplicantService: process.env.PROFILED_APPLICANT_SERVICE,
    documentUploadService: process.env.DOCUMENT_UPLOAD_SERVICE,
    transactionService: process.env.TRANSACTION_SERVICE,
    userService: process.env.USER_SERVICE,
    roleService: process.env.ROLE_SERVICE,
    tenantService: process.env.TENANT_SERVICE,
    tenantId: process.env.TENANT_ID,
    configurationService: process.env.CONFIGURATION_SERVICE,
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/api"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/auth-next",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: "https://specializedcommdev.sterlingapps.p.azurewebsites.net/api/",
  },

  auth: {
    strategies: {
      local1: {
        scheme: "local",
        token: {
          property: "result.accessToken",
          maxAge: 86400,
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: "result",
          // autoFetch: true
        },
        endpoints: {
          login: {
            url: "", // login request url here
            method: "post",
            headers: { "Abp.TenantId": 1 },
          },
          logout: false,
          user: {
            url: "", // url to get logged-in user here
            method: "get",
          },
        },
      },
      local2: {
        scheme: "local",
        token: {
          property: "result.accessToken",
          maxAge: 86400,
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: "result",
          // autoFetch: true
        },
        endpoints: {
          login: {
            url: "", // login request url here for strategy local2
            method: "post",
            // headers: { 'Abp.TenantId': 1 },
          },
          logout: false,
          user: {
            url: "", // url to get logged-in user here for strategy local2
            method: "get",
          },
        },
      },
    },
    redirect: {
      logout: "/login",
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    treeShake: true,
    optionsPath: "~/plugins/vuetify.options.js",
    defaultAssets: false,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
