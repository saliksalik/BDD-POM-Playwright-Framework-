// pages/TextBoxPage.js
//
// Page Object for the DemoQA Text Box page.
// https://demoqa.com/text-box
//
// Design Rules:
//   ✓ NO assertions (expect) anywhere in this file
//   ✓ Resilient locators
//   ✓ Ad/overlay handling delegated to utils/helpers.js
//

'use strict';

const { BasePage }           = require('./BasePage');
const { hideAds, scrollIntoCenter } = require('../utils/helpers');

class TextBoxPage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);

    // Form fields
    this.userNameInput      = page.locator('#userName');
    this.userEmailInput     = page.locator('#userEmail');
    this.currentAddressInput = page.locator('#currentAddress');
    this.permanentAddressInput = page.locator('#permanentAddress');
    this.submitButton       = page.locator('#submit');

    // Output fields
    this.outputArea         = page.locator('#output');
  }

  async open() {
    await this.navigate('/text-box');
    await hideAds(this.page);
  }

  async fillForm(name, email, currentAddress, permanentAddress) {
    await this.userNameInput.fill(name);
    await this.userEmailInput.fill(email);
    await this.currentAddressInput.fill(currentAddress);
    await this.permanentAddressInput.fill(permanentAddress);
  }

  async submit() {
    await scrollIntoCenter(this.submitButton);
    await this.submitButton.click();
  }
}

module.exports = { TextBoxPage };
