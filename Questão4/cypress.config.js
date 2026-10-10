const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.demoblaze.com',
    supportFile: false,
    video: false,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on) {
    on('task', {
      imprimir(texto) {
        console.log(texto);
        return null;
      },
    });
    },
  },
});
