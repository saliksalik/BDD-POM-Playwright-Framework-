'use strict';

const { BasePage } = require('./BasePage');
const { hideAds } = require('../utils/helpers');

class ResizablePage extends BasePage {
  constructor(page) {
    super(page);
    this.resizableBox = page.locator('#resizableBoxWithRestriction');
    this.resizeHandle = page.locator('#resizableBoxWithRestriction .react-resizable-handle');
  }

  async open() {
    await this.navigate('/resizable');
    await hideAds(this.page);
    await this.page.waitForTimeout(2500);
  }

  async getBoxSize() {
    const box = await this.resizableBox.boundingBox();
    return box ? { width: box.width, height: box.height } : null;
  }
}

module.exports = { ResizablePage };
