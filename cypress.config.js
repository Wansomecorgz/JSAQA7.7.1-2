const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'gzwu8a',
  e2e: {
    baseUrl : "http://qamid.tmweb.ru/",
    setupNodeEvents(on, config) {
    },
  },
});
