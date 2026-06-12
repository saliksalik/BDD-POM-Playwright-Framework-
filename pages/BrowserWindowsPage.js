'use strict';

const { BasePage } = require('./BasePage');
const { hideAds, scrollIntoCenter } = require('../utils/helpers');

class BrowserWindowsPage extends BasePage {
  constructor(page) {
    super(page);
    this.newTabButton = page.locator('#tabButton');
    this.newWindowButton = page.locator('#windowButton');
    this.messageWindowButton = page.locator('#messageWindowButton');
    this.sampleHeading = page.locator('#sampleHeading');
  }

  async open() {
    await this.navigate('/browser-windows');
    await hideAds(this.page);
  }

  async openNewTab() {
    await scrollIntoCenter(this.newTabButton);
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.newTabButton.click(),
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    return newPage;
  }

  async openNewWindow() {
    await scrollIntoCenter(this.newWindowButton);
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.newWindowButton.click(),
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    return newPage;
  }
}

module.exports = { BrowserWindowsPage };
