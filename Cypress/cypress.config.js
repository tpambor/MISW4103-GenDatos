const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  scrollBehavior: 'center',
  e2e: {
    baseUrl: 'http://localhost:3001',
    env: {
      username: 'pedro.rulfo@example.org',
      password: '0123456789+',
      fullName: 'Pedro Rulfo',
      blogTitle: 'Mi blog de literatura'
    },
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' && browser.isHeadless) {
          launchOptions.args.push('--window-size=1920,1080');
        }

        return launchOptions;
      })
    },
  },
});
