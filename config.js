const {api = 'https://api.shishatrip.de/api'} = process.env;

module.exports = {
  publicRuntimeConfig: {
    pageConfig: {
      auth: false,
      footer: true, // default values of header,footer,layout and auth configs.
      header: true,
      sidebar: true,
      layout: true,
    },
    api: 'https://api.shishatrip.de/api',
    saved_token: 'JsKjDobJlTjLHo6vlLVSUHMpqyHzqHKmFvJgNWm9y3KTf43XGoHEYnAE75By',
  },
  serverRuntimeConfig: {},
};
