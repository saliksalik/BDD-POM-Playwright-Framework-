'use strict';

const { BasePage } = require('./BasePage');
const { hideAds } = require('../utils/helpers');

class DraggablePage extends BasePage {
  constructor(page) {
    super(page);
    // Tabs
    this.simpleTab = page.locator('#draggableExample-tab-simple');
    this.axisTab = page.locator('#draggableExample-tab-axisRestriction');
    this.containerTab = page.locator('#draggableExample-tab-containerRestriction');
    this.cursorTab = page.locator('#draggableExample-tab-cursorStyle');

    // Simple Tab Elements
    this.dragBox = page.locator('#dragBox');

    // Axis Restricted Tab Elements
    this.restrictedX = page.locator('#restrictedX');
    this.restrictedY = page.locator('#restrictedY');

    // Container Restricted Tab Elements
    this.containedInBox = page.locator('#containmentWrapper div.draggable');
    this.containerBox = page.locator('#containmentWrapper');
    this.containedInParent = page.locator('#draggableExample-tabpane-containerRestriction span.ui-widget-header');
    this.parentContainer = page.locator('#draggableExample-tabpane-containerRestriction div.draggable.ui-widget-content.m-3');

    // Cursor Style Tab Elements
    this.cursorCenter = page.locator('#cursorCenter');
    this.cursorTopLeft = page.locator('#cursorTopLeft');
    this.cursorBottom = page.locator('#cursorBottom');
  }

  async open() {
    await this.navigate('/dragabble');
    await hideAds(this.page);
    await this.page.waitForTimeout(2500);
  }

  async openSimpleTab() {
    await this.simpleTab.click();
    await this.page.waitForTimeout(500);
  }

  async openAxisTab() {
    await this.axisTab.click();
    await this.page.waitForTimeout(500);
  }

  async openContainerTab() {
    await this.containerTab.click();
    await this.page.waitForTimeout(500);
  }

  async openCursorTab() {
    await this.cursorTab.click();
    await this.page.waitForTimeout(500);
  }

  async dragElementByOffset(locator, dx, dy, clickOffsetX = null, clickOffsetY = null) {
    await locator.scrollIntoViewIfNeeded();
    await locator.hover();
    await this.page.waitForTimeout(200);
    const box = await locator.boundingBox();
    if (!box) throw new Error('Element not found');
    
    const startX = clickOffsetX !== null ? box.x + clickOffsetX : box.x + box.width / 2;
    const startY = clickOffsetY !== null ? box.y + clickOffsetY : box.y + box.height / 2;
    
    await this.page.mouse.move(startX, startY);
    await this.page.mouse.down();
    await this.page.waitForTimeout(200);
    await this.page.mouse.move(startX + dx, startY + dy, { steps: 20 });
    await this.page.waitForTimeout(200);
    await this.page.mouse.up();
    await this.page.waitForTimeout(500);
  }

  // Backwards compatibility for existing step-definitions
  async dragByOffset(dx, dy) {
    await this.dragElementByOffset(this.dragBox, dx, dy);
  }
}

module.exports = { DraggablePage };
