// pages/CheckBoxPage.js
'use strict';

const { BasePage } = require('./BasePage');
const { hideAds, scrollIntoCenter } = require('../utils/helpers');

class CheckBoxPage extends BasePage {
  constructor(page) {
    super(page);
    this.resultContainer = page.locator('#result');
    this.treeSwitchers = page.locator('.rc-tree-switcher');
  }

  async open() {
    await this.navigate('/checkbox');
    await hideAds(this.page);
  }

  async expandAll() {
    // Wait for the tree to be visible first
    await this.page.getByRole('tree').waitFor({ state: 'visible' });
    
    // Locate the "Expand All" + button
    const expandAllButton = this.page.locator('button[aria-label="Expand all"], .rct-option-expand-all').first();
    
    if (await expandAllButton.count() > 0) {
      await expandAllButton.click();
    } else {
      // Fallback for different DOM structures
      const closedSwitcher = this.page.locator('.rc-tree-switcher_close, .rct-collapse');
      while (await closedSwitcher.count() > 0) {
        await closedSwitcher.first().click({ force: true });
        await this.page.waitForTimeout(200);
      }
    }
    await this.page.waitForTimeout(500); // Give nodes time to expand
  }

  async checkNode(labelName) {
    const node = this.page.locator('.rc-tree-treenode').filter({ has: this.page.locator('.rc-tree-title', { hasText: labelName }) });
    await scrollIntoCenter(node);
    const checkbox = node.locator('.rc-tree-checkbox');
    await checkbox.click({ force: true });
  }
}

module.exports = { CheckBoxPage };
