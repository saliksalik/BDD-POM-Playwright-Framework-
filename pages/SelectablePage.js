'use strict';

const { BasePage } = require('./BasePage');
const { hideAds } = require('../utils/helpers');

class SelectablePage extends BasePage {
  constructor(page) {
    super(page);
    this.listTab = page.getByRole('tab', { name: 'List' });
    this.listItems = page.locator('#verticalListContainer .list-group-item');
  }

  async open() {
    await this.navigate('/selectable');
    await hideAds(this.page);
  }

  async openListTab() {
    await this.listTab.click();
  }

  getListItem(text) {
    return this.listItems.filter({ hasText: text }).first();
  }
}

module.exports = { SelectablePage };
