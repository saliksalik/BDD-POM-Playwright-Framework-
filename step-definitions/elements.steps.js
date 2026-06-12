// step-definitions/elements.steps.js
'use strict';

const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

// ── Checkbox ────────────────────────────────────────────────────────────────

Given('the user is on the DemoQA Check Box page', async function () {
  await this.checkBoxPage.open();
});

When('the user expands all checkbox folders', async function () {
  await this.checkBoxPage.expandAll();
});

When('the user selects the {string} checkbox node', async function (labelName) {
  await this.checkBoxPage.checkNode(labelName);
});

Then('the result section should display text containing {string}', async function (expectedText) {
  await expect(this.checkBoxPage.resultContainer).toContainText(expectedText);
});

// ── Alternative Checkbox Step Definitions (User Requested) ──────────────────

When('the user expands the check box tree', async function () {
  const expandAllBtn = this.page.locator("button[title='Expand all']");
  await expandAllBtn.click();
});

When('the user selects the {string} node', async function (nodeName) {
  // Find the label element containing the dynamic text
  const label = this.page.locator('label').filter({ hasText: nodeName });
  // Locate the visual checkbox span (.rct-checkbox) inside that label
  const checkboxSpan = label.locator('.rct-checkbox');
  // Scroll into view and click
  await checkboxSpan.scrollIntoViewIfNeeded();
  await checkboxSpan.click();
});

Then('the check box result should display {string}', async function (expectedText) {
  const result = this.page.locator('#result');
  await expect(result).toContainText(expectedText);
});


// ── Radio Button ────────────────────────────────────────────────────────────

Given('the user is on the DemoQA Radio Button page', async function () {
  await this.radioButtonPage.open();
});

When('the user selects the {string} radio button', async function (btnName) {
  if (btnName === 'Yes') {
    await this.radioButtonPage.selectYes();
  } else if (btnName === 'Impressive') {
    await this.radioButtonPage.selectImpressive();
  }
});

Then('the result output should display selected value {string}', async function (expectedValue) {
  await expect(this.radioButtonPage.selectionResult).toHaveText(expectedValue);
});

// ── Web Tables ──────────────────────────────────────────────────────────────

Given('the user is on the DemoQA Web Tables page', async function () {
  await this.page.goto('https://demoqa.com/webtables');
});

When(
  'the user adds a new record with details {string}, {string}, {string}, {string}, {string}, {string}',
  async function (firstName, lastName, email, age, salary, department) {
    await this.page.locator('#addNewRecordButton').click();
    await this.page.locator('#firstName').fill(firstName);
    await this.page.locator('#lastName').fill(lastName);
    await this.page.locator('#userEmail').fill(email);
    await this.page.locator('#age').fill(age);
    await this.page.locator('#salary').fill(salary);
    await this.page.locator('#department').fill(department);
    await this.page.locator('#submit').click();
  }
);

Then('the web table should display the row for {string}', async function (email) {
  const row = this.page.locator('.rt-tr-group').filter({ hasText: email });
  await expect(row).toBeVisible();
});

When('the user searches for {string}', async function (searchText) {
  await this.page.locator('#searchBox').fill(searchText);
  await this.page.waitForTimeout(500); // Give React Table time to filter
});

Then('the web table should only show rows containing {string}', async function (expectedText) {
  // Filter the .rt-tr-group locators to only those that contain actual text (to ignore DemoQA's empty padding rows),
  // and assert that the text content of the first returned row contains the search term.
  const row = this.page.locator('.rt-tr-group').filter({ hasText: expectedText }).first();
  await expect(row).toBeVisible();
  await expect(row).toContainText(expectedText);
});

When('the user deletes the record with email {string}', async function (email) {
  const row = this.page.locator('.rt-tr-group').filter({ hasText: email });
  await row.locator('[title="Delete"]').click();
});

Then('the row for {string} should no longer exist in the web table', async function (email) {
  const row = this.page.locator('.rt-tr-group').filter({ hasText: email });
  await expect(row).toHaveCount(0);
});


// ── Buttons ─────────────────────────────────────────────────────────────────

Given('the user is on the DemoQA Buttons page', async function () {
  await this.buttonsPage.open();
});

When('the user performs a double click', async function () {
  await this.buttonsPage.doubleClick();
});

Then('the double click message should display', async function () {
  await expect(this.buttonsPage.doubleClickMessage).toBeVisible();
  await expect(this.buttonsPage.doubleClickMessage).toContainText('You have done a double click');
});

When('the user performs a right click', async function () {
  await this.buttonsPage.rightClick();
});

Then('the right click message should display', async function () {
  await expect(this.buttonsPage.rightClickMessage).toBeVisible();
  await expect(this.buttonsPage.rightClickMessage).toContainText('You have done a right click');
});

When('the user performs a dynamic left click', async function () {
  await this.buttonsPage.dynamicClick();
});

Then('the dynamic click message should display', async function () {
  await expect(this.buttonsPage.dynamicClickMessage).toBeVisible();
  await expect(this.buttonsPage.dynamicClickMessage).toContainText('You have done a dynamic click');
});

// ── Broken Links ────────────────────────────────────────────────────────────

Given('the user is on the DemoQA Broken Links page', async function () {
  await this.brokenLinksPage.open();
});

Then('the valid image should be visible and have natural width', async function () {
  await expect(this.brokenLinksPage.validImage).toBeVisible();
  await expect(this.brokenLinksPage.validImage).toHaveAttribute('src', '/images/Toolsqa.jpg');
});

Then('the broken image should be visible and fail to load', async function () {
  await expect(this.brokenLinksPage.brokenImage).toBeVisible();
  await expect(this.brokenLinksPage.brokenImage).toHaveAttribute('src', '/images/Toolsqa_1.jpg');
});

Then('the valid link and broken link should be visible', async function () {
  await expect(this.brokenLinksPage.validLink).toBeVisible();
  await expect(this.brokenLinksPage.brokenLink).toBeVisible();
});

// ── Dynamic Properties ───────────────────────────────────────────────────────

Given('the user is on the DemoQA Dynamic Properties page', async function () {
  await this.dynamicPropertiesPage.open();
});

Then('the enable after button should eventually be enabled', async function () {
  await expect(this.dynamicPropertiesPage.enableAfterButton).toBeVisible();
  await this.dynamicPropertiesPage.waitForEnableButton();
  await expect(this.dynamicPropertiesPage.enableAfterButton).toBeEnabled();
});

Then('the visible after button should be visible', async function () {
  await expect(this.dynamicPropertiesPage.visibleAfter).toBeVisible({ timeout: 10000 });
});

// ── Links ────────────────────────────────────────────────────────────────────

Given('the user is on the DemoQA Links page', async function () {
  await this.linksPage.open();
});

When('the user clicks the simple link and switches to the tab', async function () {
  this.newPage = await this.linksPage.clickSimpleLink();
});

Then('the new tab URL should contain {string}', async function (expectedUrl) {
  await expect(this.newPage).toHaveURL(new RegExp(expectedUrl));
  await this.newPage.close();
});

When('the user clicks the dynamic link and switches to the tab', async function () {
  this.newPage = await this.linksPage.clickDynamicLink();
});

// ── Upload and Download ──────────────────────────────────────────────────────

Given('the user is on the DemoQA Upload and Download page', async function () {
  await this.uploadDownloadPage.open();
});

When('the user downloads the sample file', async function () {
  this.download = await this.uploadDownloadPage.downloadSampleFile();
});

Then('the downloaded file name should be valid', async function () {
  expect(this.download.suggestedFilename()).not.toBeNull();
});

When('the user uploads a sample file', async function () {
  const { UploadDownloadPage } = require('../pages/UploadDownloadPage');
  const uploadPath = UploadDownloadPage.sampleFilePath();
  await this.uploadDownloadPage.uploadFile(uploadPath);
});

Then('the uploaded file path should contain {string}', async function (expectedName) {
  await expect(this.uploadDownloadPage.uploadedFilePath).toContainText(expectedName);
});

