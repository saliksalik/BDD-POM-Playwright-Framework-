'use strict';

const { BasePage } = require('./BasePage');
const { hideAds, scrollIntoCenter } = require('../utils/helpers');

class DraggablePage extends BasePage {
  constructor(page) {
    super(page);
    this.dragBox = page.locator('#dragBox');
  }

  async open() {
    await this.navigate('/dragabble');
    await hideAds(this.page);
    await this.page.waitForTimeout(2500);
  }

  async dragByOffset(dx, dy) {
    await this.dragBox.hover();
    await this.dragBox.click();
    await this.page.waitForTimeout(200);
    const box = await this.dragBox.boundingBox();
    if (!box) throw new Error('dragBox not found');
    const startX = box.x + box.width / 2;
    const startY = box.y + box.height / 2;
    await this.page.mouse.move(startX, startY);
    await this.page.mouse.down();
    await this.page.waitForTimeout(200);
    await this.page.mouse.move(startX + dx, startY + dy, { steps: 20 });
    await this.page.waitForTimeout(200);
    await this.page.mouse.up();
    await this.page.waitForTimeout(500);
  }
}

module.exports = { DraggablePage };
