'use strict';

const { BasePage } = require('./BasePage');
const { hideAds } = require('../utils/helpers');

class BrokenLinksPage extends BasePage {
  constructor(page) {
    super(page);
    this.validLink = page.getByRole('link', { name: 'Click Here for Valid Link' });
    this.brokenLink = page.getByRole('link', { name: 'Click Here for Broken Link' });
    this.validImage = page.locator('p').filter({ hasText: /^Valid image$/i }).locator('xpath=following-sibling::img[1]');
    this.brokenImage = page.locator('p').filter({ hasText: /^Broken image$/i }).locator('xpath=following-sibling::img[1]');
  }

  async open() {
    await this.navigate('/broken');
    await hideAds(this.page);
  }
}

module.exports = { BrokenLinksPage };
