// pages/FramesPage.js
'use strict';

const { BasePage } = require('./BasePage');
const { hideAds } = require('../utils/helpers');

class FramesPage extends BasePage {
  constructor(page) {
    super(page);
    this.frame1Locator = page.frameLocator('#frame1');
  }

  async openFrames() {
    await this.navigate('/frames');
    await hideAds(this.page);
  }

  async openNestedFrames() {
    await this.navigate('/nestedframes');
    await hideAds(this.page);
  }

  /**
   * Retrieves heading text from frame1
   */
  async getFrame1HeadingText() {
    return await this.frame1Locator.locator('#sampleHeading').textContent();
  }

  /**
   * Navigates nested frames and returns text from parent and child frames.
   */
  async getNestedFrameTexts() {
    const parentFrame = this.page.frameLocator('#frame1');
    const childFrame  = parentFrame.frameLocator('iframe');

    const parentText = await parentFrame.locator('body').innerText();
    const childText  = await childFrame.locator('body').innerText();

    return { parentText, childText };
  }
}

module.exports = { FramesPage };
