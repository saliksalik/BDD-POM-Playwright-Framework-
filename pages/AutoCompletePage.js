'use strict';

const { BasePage } = require('./BasePage');
const { hideAds } = require('../utils/helpers');

class AutoCompletePage extends BasePage {
  constructor(page) {
    super(page);
    this.multipleInput = page.locator('#autoCompleteMultipleInput');
    this.singleInput = page.locator('#autoCompleteSingleInput');
    this.multipleValues = page.locator('.auto-complete__multi-value__label');
    this.singleValue = page.locator('.auto-complete__single-value');
  }

  async open() {
    await this.navigate('/auto-complete');
    await hideAds(this.page);
  }

  async selectMultipleColor(color) {
    await this.multipleInput.fill(color);
    await this.page.getByRole('option', { name: color, exact: true }).click();
  }

  async selectSingleColor(color) {
    await this.singleInput.fill(color);
    await this.page.getByRole('option', { name: color, exact: true }).click();
  }
}

module.exports = { AutoCompletePage };
