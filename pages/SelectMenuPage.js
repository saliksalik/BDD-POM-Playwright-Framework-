'use strict';

const { BasePage } = require('./BasePage');
const { hideAds } = require('../utils/helpers');

class SelectMenuPage extends BasePage {
  constructor(page) {
    super(page);
    this.oldStyleSelect = page.locator('#oldSelectMenu');
    this.carsSelect = page.locator('#cars');
    this.standardSingle = page.locator('#react-select-2-input');
    this.standardMulti = page.locator('#react-select-3-input');
  }

  async open() {
    await this.navigate('/select-menu');
    await hideAds(this.page);
  }

  async selectOldStyleOption(label) {
    await this.oldStyleSelect.selectOption({ label });
  }

  async selectCar(value) {
    await this.carsSelect.selectOption(value);
  }
}

module.exports = { SelectMenuPage };
