// pages/AlertsPage.js
'use strict';

const { BasePage } = require('./BasePage');
const { hideAds, scrollIntoCenter } = require('../utils/helpers');

class AlertsPage extends BasePage {
  constructor(page) {
    super(page);

    // Alert buttons
    this.alertButton       = page.locator('#alertButton');
    this.timerAlertButton  = page.locator('#timerAlertButton');
    this.confirmButton     = page.locator('#confirmButton');
    this.promptButton      = page.locator('#promtButton'); // note: DemoQA typo '#promtButton'

    // Alert results
    this.confirmResult     = page.locator('#confirmResult');
    this.promptResult      = page.locator('#promptResult');

    // Modal buttons
    this.smallModalButton  = page.locator('#showSmallModal');
    this.largeModalButton  = page.locator('#showLargeModal');
    this.closeSmallModalButton = page.locator('#closeSmallModal');
    this.closeLargeModalButton = page.locator('#closeLargeModal');

    // Modal elements
    this.modalTitle        = page.locator('.modal-title');
    this.modalBody         = page.locator('.modal-body');
  }

  async openAlerts() {
    await this.navigate('/alerts');
    await hideAds(this.page);
  }

  async openModals() {
    await this.navigate('/modal-dialogs');
    await hideAds(this.page);
  }

  async clickAlert() {
    await scrollIntoCenter(this.alertButton);
    await this.alertButton.click();
  }

  async clickConfirm() {
    await scrollIntoCenter(this.confirmButton);
    await this.confirmButton.click();
  }

  async clickPrompt() {
    await scrollIntoCenter(this.promptButton);
    await this.promptButton.click();
  }

  async openSmallModal() {
    await scrollIntoCenter(this.smallModalButton);
    await this.smallModalButton.click();
  }

  async closeSmallModal() {
    await this.closeSmallModalButton.click();
  }

  async openLargeModal() {
    await scrollIntoCenter(this.largeModalButton);
    await this.largeModalButton.click();
  }

  async closeLargeModal() {
    await this.closeLargeModalButton.click();
  }
}

module.exports = { AlertsPage };
