// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.{js,ts}', // Supports .js and .ts test files
  timeout: 40 * 1000,
  expect: { timeout: 5 * 1000 },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: true, // Run in headless mode
    testIdAttribute: 'data-test-id', // Pridėta tinkamai į 'use' objektą
    screenshot: 'on', //screenshotai, su skirtingais pasirinkimais
    trace: 'on'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  outputDir: 'test-results/', // Save results in a separate directory
  retries: 1, // Retry once if test fails
  workers: 1

});
