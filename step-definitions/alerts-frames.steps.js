// step-definitions/alerts-frames.steps.js
'use strict';

const { Given, When, Then } = require('@cucumber/cucumber');
const { expect }            = require('@playwright/test');

// ── Alerts ──────────────────────────────────────────────────────────────────

Given('the user is on the DemoQA Alerts page', async function () {
  await this.alertsPage.openAlerts();
});

When('the user triggers a basic alert dialog', async function () {
  // Set up a one-time dialog listener that accepts the alert
  this.page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('alert');
    await dialog.accept();
  });
  await this.alertsPage.clickAlert();
});

When('the user accepts the confirmation alert dialog', async function () {
  this.page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('confirm');
    await dialog.accept(); // Selects 'Ok'
  });
  await this.alertsPage.clickConfirm();
});

Then('the confirm result should display {string}', async function (expectedResult) {
  await expect(this.alertsPage.confirmResult).toBeVisible();
  await expect(this.alertsPage.confirmResult).toContainText(expectedResult);
});

When('the user inputs {string} in the prompt dialog', async function (promptText) {
  this.page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('prompt');
    await dialog.accept(promptText); // Enters text and accepts
  });
  await this.alertsPage.clickPrompt();
});

Then('the prompt result should display {string}', async function (expectedResult) {
  await expect(this.alertsPage.promptResult).toBeVisible();
  await expect(this.alertsPage.promptResult).toContainText(expectedResult);
});

// ── Nested Frames ───────────────────────────────────────────────────────────

Given('the user is on the DemoQA Nested Frames page', async function () {
  await this.framesPage.openNestedFrames();
});

Then(
  'the nested frame contents should contain parent text {string} and child text {string}',
  async function (expectedParent, expectedChild) {
    const { parentText, childText } = await this.framesPage.getNestedFrameTexts();
    expect(parentText).toContain(expectedParent);
    expect(childText).toContain(expectedChild);
  }
);

// ── Modals ──────────────────────────────────────────────────────────────────

Given('the user is on the DemoQA Modal Dialogs page', async function () {
  await this.alertsPage.openModals();
});

When('the user opens the Small Modal', async function () {
  await this.alertsPage.openSmallModal();
});

Then(
  'the modal dialog should be displayed with title {string} and body containing {string}',
  async function (expectedTitle, expectedBodyText) {
    await expect(this.alertsPage.modalTitle).toBeVisible();
    await expect(this.alertsPage.modalTitle).toHaveText(expectedTitle);
    await expect(this.alertsPage.modalBody).toContainText(expectedBodyText);
  }
);

When('the user closes the modal dialog', async function () {
  await this.alertsPage.closeSmallModal();
});

Then('the modal dialog should be hidden', async function () {
  await expect(this.alertsPage.modalTitle).toBeHidden();
});

When('the user opens the Large Modal', async function () {
  await this.alertsPage.openLargeModal();
});

When('the user closes the large modal dialog', async function () {
  await this.alertsPage.closeLargeModal();
});


// ── Browser Windows ─────────────────────────────────────────────────────────

Given('the user is on the DemoQA Browser Windows page', async function () {
  await this.browserWindowsPage.open();
});

When('the user opens a new tab', async function () {
  this.newTab = await this.browserWindowsPage.openNewTab();
});

Then('the new tab heading should contain {string}', async function (expectedText) {
  const tabHeadingText = await this.newTab.locator('#sampleHeading').textContent();
  expect(tabHeadingText).toContain(expectedText);
  await this.newTab.close();
});

When('the user opens a new window', async function () {
  this.newWindow = await this.browserWindowsPage.openNewWindow();
});

Then('the new window heading should contain {string}', async function (expectedText) {
  const windowHeadingText = await this.newWindow.locator('#sampleHeading').textContent();
  expect(windowHeadingText).toContain(expectedText);
  await this.newWindow.close();
});

// ── Frames ──────────────────────────────────────────────────────────────────

Given('the user is on the DemoQA Frames page', async function () {
  await this.framesPage.openFrames();
});

Then('the frame heading text should contain {string}', async function (expectedText) {
  const heading = await this.framesPage.getFrame1HeadingText();
  expect(heading).toContain(expectedText);
});

