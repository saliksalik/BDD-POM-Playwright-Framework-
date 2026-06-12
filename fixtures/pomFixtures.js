// fixtures/pomFixtures.js
'use strict';

const { test: base } = require('@playwright/test');
const { createPageObjects, PAGE_OBJECT_KEYS } = require('../pages/createPageObjects');

const pageObjectFixtures = Object.fromEntries(
  PAGE_OBJECT_KEYS.map((key) => [
    key,
    async ({ page }, use) => {
      await use(createPageObjects(page)[key]);
    },
  ])
);

const test = base.extend({
  page: async ({ page }, use) => {
    await page.route('**/*', route => {
      const url = route.request().url();
      if (url.includes('google-analytics') ||
          url.includes('googletagservices') ||
          url.includes('googleadservices') ||
          url.includes('googleads') ||
          url.includes('doubleclick') ||
          url.includes('adnxs') ||
          url.includes('amazon-adsystem') ||
          url.includes('pagead')) {
        route.abort();
      } else {
        route.continue();
      }
    });
    await use(page);
  },
  ...pageObjectFixtures,
});

const { expect } = require('@playwright/test');

module.exports = { test, expect };
