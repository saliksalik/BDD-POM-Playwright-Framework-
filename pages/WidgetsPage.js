// pages/WidgetsPage.js
'use strict';

const { BasePage } = require('./BasePage');
const { hideAds, scrollIntoCenter } = require('../utils/helpers');

class WidgetsPage extends BasePage {
  constructor(page) {
    super(page);

    this.accordionHeader1 = page.getByRole('button', { name: 'What is Lorem Ipsum?' });
    this.accordionHeader2 = page.getByRole('button', { name: 'Where does it come from?' });
    // Target the Bootstrap collapse divs — these receive the 'show' class when expanded
    this.accordionContent1 = page.locator('.collapse', { hasText: 'Lorem Ipsum is simply dummy text' });
    this.accordionContent2 = page.locator('.collapse', { hasText: 'Contrary to popular belief' });

    this.sliderInput = page.locator('.range-slider');
    this.sliderValue = page.locator('#sliderValue');

    this.startStopButton = page.locator('#startStopButton');
    this.progressBar = page.locator('div[role="progressbar"]');
    this.resetButton = page.locator('#resetButton');
  }

  async openAccordian() {
    await this.navigate('/accordian');
    await hideAds(this.page);
  }

  async openSlider() {
    await this.navigate('/slider');
    await hideAds(this.page);
  }

  async openProgressBar() {
    await this.navigate('/progress-bar');
    await hideAds(this.page);
  }

  async clickAccordionHeader2() {
    await scrollIntoCenter(this.accordionHeader2);
    await this.accordionHeader2.click();
  }

  async setSliderValue(value) {
    await scrollIntoCenter(this.sliderInput);
    await this.sliderInput.fill(value.toString());
  }

  async clickStartProgressBar() {
    await scrollIntoCenter(this.startStopButton);
    await this.startStopButton.click();
  }

  async waitForProgressBarComplete() {
    await this.resetButton.waitFor({ state: 'visible', timeout: 30000 });
  }
}

module.exports = { WidgetsPage };
