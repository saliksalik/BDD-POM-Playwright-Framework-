'use strict';

const { BasePage } = require('./BasePage');
const { hideAds, scrollIntoCenter } = require('../utils/helpers');

class LinksPage extends BasePage {
  constructor(page) {
    super(page);
    this.simpleLink = page.locator('#simpleLink');
    this.dynamicLink = page.locator('#dynamicLink');
    this.createdLink = page.locator('#created');
    this.noContentLink = page.locator('#no-content');
    this.linkResponse = page.locator('#linkResponse');
  }

  async open() {
    await this.navigate('/links');
    await hideAds(this.page);
  }

  async clickSimpleLink() {
    await scrollIntoCenter(this.simpleLink);
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.simpleLink.click(),
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    return newPage;
  }

  async clickDynamicLink() {
    await scrollIntoCenter(this.dynamicLink);
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.dynamicLink.click(),
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    return newPage;
  }
}

module.exports = { LinksPage };
