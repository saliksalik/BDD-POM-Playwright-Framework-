'use strict';

const { BasePage } = require('./BasePage');
const { hideAds, scrollIntoCenter } = require('../utils/helpers');

class TabsPage extends BasePage {
  constructor(page) {
    super(page);
    this.whatTab = page.getByRole('tab', { name: 'What' });
    this.originTab = page.getByRole('tab', { name: 'Origin' });
    this.whatPanel = page.locator('#demo-tabpane-what');
    this.originPanel = page.locator('#demo-tabpane-origin');
  }

  async open() {
    await this.navigate('/tabs');
    await hideAds(this.page);
  }

  async openOriginTab() {
    await scrollIntoCenter(this.originTab);
    await this.originTab.click();
  }
}

module.exports = { TabsPage };
