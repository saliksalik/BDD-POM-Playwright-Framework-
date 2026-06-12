// pages/ButtonsPage.js
'use strict';

const { BasePage } = require('./BasePage');
const { hideAds, scrollIntoCenter } = require('../utils/helpers');

class ButtonsPage extends BasePage {
  constructor(page) {
    super(page);

    this.doubleClickBtn  = page.locator('#doubleClickBtn');
    this.rightClickBtn   = page.locator('#rightClickBtn');
    // The dynamic click button has a dynamic ID, so we use exact button text match.
    this.dynamicClickBtn = page.getByRole('button', { name: 'Click Me', exact: true });

    // Success messages
    this.doubleClickMessage  = page.locator('#doubleClickMessage');
    this.rightClickMessage   = page.locator('#rightClickMessage');
    this.dynamicClickMessage = page.locator('#dynamicClickMessage');
  }

  async open() {
    await this.navigate('/buttons');
    await hideAds(this.page);
  }

  async doubleClick() {
    await scrollIntoCenter(this.doubleClickBtn);
    await this.doubleClickBtn.dblclick();
  }

  async rightClick() {
    await scrollIntoCenter(this.rightClickBtn);
    await this.rightClickBtn.click({ button: 'right' });
  }

  async dynamicClick() {
    await scrollIntoCenter(this.dynamicClickBtn);
    await this.dynamicClickBtn.click();
  }
}

module.exports = { ButtonsPage };
