const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  reporter: [
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    ['allure-playwright', { detail: true, outputFolder: 'allure-results' }],
  ],
  use: {
    baseURL: 'https://demoqa.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 30000,
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
  outputDir: process.env.TEMP
    ? `${process.env.TEMP}/playwright-pom-artifacts`
    : 'test-results/artifacts/',
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
