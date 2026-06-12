// pages/RadioButtonPage.js
'use strict';

const { BasePage } = require('./BasePage');
const { hideAds } = require('../utils/helpers');

class RadioButtonPage extends BasePage {
  constructor(page) {
    super(page);
    this.yesLabel = page.getByText('Yes', { exact: true });
    this.impressiveLabel = page.getByText('Impressive', { exact: true });
    this.selectionResult = page.locator('.text-success');
  }

  async open() {
    await this.navigate('/radio-button');
    await hideAds(this.page);
  }

  async selectYes() {
    await this.yesLabel.click();
  }

  async selectImpressive() {
    await this.impressiveLabel.click();
  }
}

module.exports = { RadioButtonPage };
