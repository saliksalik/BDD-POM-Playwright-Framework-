'use strict';

const { BasePage } = require('./BasePage');
const { hideAds } = require('../utils/helpers');

class SortablePage extends BasePage {
  constructor(page) {
    super(page);
    this.listTab = page.getByRole('tab', { name: 'List' });
    this.gridTab = page.getByRole('tab', { name: 'Grid' });
    this.listItems = page.locator('#demo-tabpane-list .list-group-item');
    this.gridItems = page.locator('#demo-tabpane-grid .list-group-item');
  }

  async open() {
    await this.navigate('/sortable');
    await hideAds(this.page);
  }

  async openListTab() {
    await this.listTab.click();
  }

  async openGridTab() {
    await this.gridTab.click();
  }

  getListItemByText(text) {
    return this.listItems.filter({ hasText: text });
  }

  async dragAndDrop(sourceLocator, targetLocator) {
    const sourceBox = await sourceLocator.boundingBox();
    const targetBox = await targetLocator.boundingBox();
    if (!sourceBox || !targetBox) throw new Error('Source or target box not found');

    await this.page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
    await this.page.mouse.down();
    await this.page.waitForTimeout(300);
    await this.page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2 + 10, { steps: 20 });
    await this.page.waitForTimeout(300);
    await this.page.mouse.up();
  }
}

module.exports = { SortablePage };
