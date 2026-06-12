// hooks/hooks.js
'use strict';

const { Before, After, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { createPageObjects } = require('../pages/createPageObjects');
const env = require('../config/env');

setDefaultTimeout(60000);

let browser;

BeforeAll({ timeout: 30000 }, async function () {
  browser = await chromium.launch({ headless: env.headless });
});

Before(async function () {
  this.context = await browser.newContext();
  this.page = await this.context.newPage();

  await this.page.route('**/*', route => {
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

  Object.assign(this, createPageObjects(this.page));
});

After(async function () {
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
});

AfterAll({ timeout: 30000 }, async function () {
  if (browser) await browser.close();
});
