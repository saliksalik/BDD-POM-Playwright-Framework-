// pages/BasePage.js
'use strict';

const env = require('../config/env');

class BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    if (!page._adsBlocked) {
      page._adsBlocked = true;
      this.page.route('**/*', route => {
        const url = route.request().url();
        if (/googleads|googlesyndication|doubleclick|adnxs|amazon-adsystem|ad\.plus|analytics|googletagservices/.test(url)) {
          route.abort();
        } else {
          route.continue();
        }
      }).catch(() => {});
    }
  }

  /**
   * Navigate to a URL — resolves relative paths against the base URL.
   * Waits for full 'load' event since ads are blocked to avoid timeouts.
   * @param {string} url
   */
  async navigate(url = '/') {
    const targetUrl = url.startsWith('http') ? url : `${env.baseURL}${url}`;
    let lastError;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        await this.page.goto(targetUrl, { waitUntil: 'load', timeout: 15000 });
        return;
      } catch (error) {
        lastError = error;
        await this.page.waitForTimeout(1000);
      }
    }
    throw lastError;
  }
}

module.exports = { BasePage };
