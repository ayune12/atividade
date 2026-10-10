const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://the-internet.herokuapp.com',
    supportFile: false,
    video: false,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on) {
    },
  },
});
