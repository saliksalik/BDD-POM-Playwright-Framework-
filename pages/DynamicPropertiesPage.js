'use strict';

const { BasePage } = require('./BasePage');
const { hideAds } = require('../utils/helpers');

class DynamicPropertiesPage extends BasePage {
  constructor(page) {
    super(page);
    this.colorChangeButton = page.getByRole('button', { name: 'Color Change' });
    this.enableAfterButton = page.getByRole('button', { name: 'Will enable 5 seconds' });
    this.visibleAfter = page.getByRole('button', { name: 'Visible After 5 Seconds' });
  }

  async open() {
    await this.navigate('/dynamic-properties');
    await hideAds(this.page);
  }

  async waitForEnableButton() {
    await this.enableAfterButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.page.waitForFunction(
      (name) => {
        const btn = [...document.querySelectorAll('button')].find(b => b.textContent.trim() === name);
        return btn && !btn.disabled;
      },
      'Will enable 5 seconds',
      { timeout: 10000 }
    );
  }

  async clickVisibleAfterTrigger() {
    await this.visibleAfterButton.click();
  }

  async waitForVisibleAfterButton() {
    await this.visibleAfter.waitFor({ state: 'visible', timeout: 10000 });
  }
}

module.exports = { DynamicPropertiesPage };
