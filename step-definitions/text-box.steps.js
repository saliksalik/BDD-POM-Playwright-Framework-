// step-definitions/text-box.steps.js
//
// Glue code connecting Gherkin steps to TextBoxPage POM methods.
// RULE: ALL expect() assertions live here — never in pages/.
//

'use strict';

const { Given, When, Then } = require('@cucumber/cucumber');
const { expect }            = require('@playwright/test');

Given('the user is on the DemoQA Text Box page', async function () {
  await this.textBoxPage.open();
});

When(
  'the user fills the text box form with name {string}, email {string}, current address {string}, and permanent address {string}',
  async function (name, email, currentAddress, permanentAddress) {
    await this.textBoxPage.fillForm(name, email, currentAddress, permanentAddress);
  }
);

When('the user submits the text box form', async function () {
  await this.textBoxPage.submit();
});

Then('the submitted details should be displayed below the form', async function () {
  await expect(this.textBoxPage.outputArea).toBeVisible();
});

Then('the output name should contain {string}', async function (expectedName) {
  const nameElement = this.textBoxPage.outputArea.locator('#name');
  await expect(nameElement).toContainText(expectedName);
});

Then('the output email should contain {string}', async function (expectedEmail) {
  const emailElement = this.textBoxPage.outputArea.locator('#email');
  await expect(emailElement).toContainText(expectedEmail);
});

Then('the output current address should contain {string}', async function (expectedCurrentAddress) {
  const currentAddrElement = this.textBoxPage.outputArea.locator('#currentAddress');
  await expect(currentAddrElement).toContainText(expectedCurrentAddress);
});

Then('the output permanent address should contain {string}', async function (expectedPermanentAddress) {
  const permAddrElement = this.textBoxPage.outputArea.locator('#permanentAddress');
  await expect(permAddrElement).toContainText(expectedPermanentAddress);
});
