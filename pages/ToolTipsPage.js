'use strict';

const { BasePage } = require('./BasePage');
const { hideAds, scrollIntoCenter } = require('../utils/helpers');

class ToolTipsPage extends BasePage {
  constructor(page) {
    super(page);
    this.toolTipButton = page.getByRole('button', { name: 'Hover me to see' });
    this.toolTipTextField = page.getByPlaceholder('Hover me to see');
    this.contraryWord = page.getByText('Contrary');
    this.sectionWord = page.getByText('1.10.32');
    this.tooltip = page.getByRole('tooltip');
  }

  async open() {
    await this.navigate('/tool-tips');
    await hideAds(this.page);
  }

  async resetMouse() {
    // Reset: Move the mouse to coordinates (0,0) at the top left of the screen.
    await this.page.mouse.move(0, 0);
  }
}

module.exports = { ToolTipsPage };
