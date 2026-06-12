// step-definitions/widgets.steps.js
'use strict';

const { Given, When, Then } = require('@cucumber/cucumber');
const { expect }            = require('@playwright/test');

// ── Accordian ───────────────────────────────────────────────────────────────

Given('the user is on the DemoQA Accordian page', async function () {
  await this.widgetsPage.openAccordian();
});

Then('the first accordion section should be expanded', async function () {
  await expect(this.widgetsPage.accordionContent1).toHaveClass(/show/);
});

When('the user clicks the second accordion header', async function () {
  await this.widgetsPage.clickAccordionHeader2();
});

Then('the second accordion section should be expanded', async function () {
  await expect(this.widgetsPage.accordionContent2).toHaveClass(/show/);
});

// ── Slider ──────────────────────────────────────────────────────────────────

Given('the user is on the DemoQA Slider page', async function () {
  await this.widgetsPage.openSlider();
});

When('the user sets the range slider to value {int}', async function (value) {
  await this.widgetsPage.setSliderValue(value);
});

Then('the slider text input value should display {string}', async function (expectedValue) {
  await expect(this.widgetsPage.sliderValue).toHaveValue(expectedValue);
});

// ── Progress Bar ────────────────────────────────────────────────────────────

Given('the user is on the DemoQA Progress Bar page', async function () {
  await this.widgetsPage.openProgressBar();
});

When('the user clicks the start progress bar button', async function () {
  await this.widgetsPage.clickStartProgressBar();
});

Then('the progress bar should eventually reach 100% complete', async function () {
  await this.widgetsPage.waitForProgressBarComplete();
  await expect(this.widgetsPage.progressBar).toHaveText('100%');
});

// ── Auto Complete ───────────────────────────────────────────────────────────

Given('the user is on the DemoQA Auto Complete page', async function () {
  await this.autoCompletePage.open();
});

When('the user selects multiple colors {string} and {string}', async function (color1, color2) {
  await this.autoCompletePage.selectMultipleColor(color1);
  await this.autoCompletePage.selectMultipleColor(color2);
});

Then('the multiple autocomplete values should display {string} and {string}', async function (color1, color2) {
  await expect(this.autoCompletePage.multipleValues).toHaveText([color1, color2]);
});

When('the user selects single color {string}', async function (color) {
  await this.autoCompletePage.selectSingleColor(color);
});

Then('the single autocomplete value should display {string}', async function (color) {
  await expect(this.autoCompletePage.singleValue).toHaveText(color);
});

// ── Date Picker ──────────────────────────────────────────────────────────────

Given('the user is on the DemoQA Date Picker page', async function () {
  await this.datePickerPage.open();
});

When('the user selects date {string}', async function (dateString) {
  await this.datePickerPage.selectMonthYear(dateString);
});

Then('the date picker input value should display {string}', async function (expectedDate) {
  await expect(this.datePickerPage.monthYearInput).toHaveValue(expectedDate);
});

// ── Menu ────────────────────────────────────────────────────────────────────

Given('the user is on the DemoQA Menu page', async function () {
  await this.menuPage.open();
});

Then('the main menu items should be visible', async function () {
  await expect(this.menuPage.mainItem1).toBeVisible();
  await expect(this.menuPage.mainItem2).toBeVisible();
});

When('the user hovers over the sub-menu triggers', async function () {
  await this.menuPage.revealSubItems();
});

Then('the sub item should be visible', async function () {
  await expect(this.menuPage.subItem).toBeVisible();
});

// ── Select Menu ─────────────────────────────────────────────────────────────

Given('the user is on the DemoQA Select Menu page', async function () {
  await this.selectMenuPage.open();
});

When('the user selects old style option {string}', async function (option) {
  await this.selectMenuPage.selectOldStyleOption(option);
});

Then('the old style select value should be {string}', async function (expectedValue) {
  await expect(this.selectMenuPage.oldStyleSelect).toHaveValue(expectedValue);
});

When('the user selects car option {string}', async function (car) {
  await this.selectMenuPage.selectCar(car);
});

Then('the car select value should be {string}', async function (expectedCar) {
  const selectedCars = await this.selectMenuPage.carsSelect.inputValue();
  expect(selectedCars).toBe(expectedCar);
});

// ── Tabs ────────────────────────────────────────────────────────────────────

Given('the user is on the DemoQA Tabs page', async function () {
  await this.tabsPage.open();
});

Then('the what tab panel should be visible', async function () {
  await expect(this.tabsPage.whatPanel).toBeVisible();
});

When('the user switches to the origin tab panel', async function () {
  await this.tabsPage.openOriginTab();
});

Then('the origin tab panel should be visible', async function () {
  await expect(this.tabsPage.originPanel).toBeVisible();
});

Then('the what tab panel should be hidden', async function () {
  await expect(this.tabsPage.whatPanel).not.toHaveClass(/active/);
});

// ── Tool Tips ───────────────────────────────────────────────────────────────

Given('the user is on the DemoQA Tool Tips page', async function () {
  await this.toolTipsPage.open();
});

When('the user hovers over the tooltip button', async function () {
  await this.toolTipsPage.hoverButton();
});

Then('the tooltip message should contain {string}', async function (expectedText) {
  await expect(this.toolTipsPage.tooltip).toBeVisible();
  await expect(this.toolTipsPage.tooltip).toContainText(expectedText);
});

