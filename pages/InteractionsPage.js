// pages/InteractionsPage.js
'use strict';

const { BasePage } = require('./BasePage');
const { hideAds, scrollIntoCenter } = require('../utils/helpers');

class InteractionsPage extends BasePage {
  constructor(page) {
    super(page);
    this.simpleTabPanel = page.getByRole('tabpanel', { name: 'Simple' });
    this.draggable = this.simpleTabPanel.locator('#draggable');
    this.droppable = this.simpleTabPanel.locator('#droppable');
  }

  async openDroppable() {
    await this.navigate('/droppable');
    await hideAds(this.page);
    await this.page.waitForTimeout(2500);
  }

  async dragAndDrop() {
    await this.draggable.hover();
    await this.page.waitForTimeout(200);
    const sourceBox = await this.draggable.boundingBox();
    await this.droppable.hover();
    await this.page.waitForTimeout(200);
    const targetBox = await this.droppable.boundingBox();
    if (!sourceBox || !targetBox) throw new Error('Source or target box not found');
    const startX = sourceBox.x + sourceBox.width / 2;
    const startY = sourceBox.y + sourceBox.height / 2;
    const endX = targetBox.x + targetBox.width / 2;
    const endY = targetBox.y + targetBox.height / 2;
    await this.page.mouse.move(startX, startY);
    await this.page.mouse.down();
    await this.page.waitForTimeout(200);
    const steps = 10;
    for (let i = 1; i <= steps; i++) {
      await this.page.mouse.move(startX + ((endX - startX) * i) / steps, startY + ((endY - startY) * i) / steps);
      await this.page.waitForTimeout(50);
    }
    await this.page.waitForTimeout(200);
    await this.page.mouse.up();
    await this.page.waitForTimeout(500);
  }
}

module.exports = { InteractionsPage };
