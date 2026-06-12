// step-definitions/interactions.steps.js
'use strict';

const { Given, When, Then } = require('@cucumber/cucumber');
const { expect }            = require('@playwright/test');

Given('the user is on the DemoQA Droppable page', async function () {
  await this.interactionsPage.openDroppable();
});

When('the user drags the source box and drops it on the target box', async function () {
  await this.interactionsPage.dragAndDrop();
});

Then('the target box label should display {string}', async function (expectedText) {
  const label = this.interactionsPage.droppable.locator('p');
  await expect(label).toHaveText(expectedText);
});

// ── Draggable ───────────────────────────────────────────────────────────────

Given('the user is on the DemoQA Draggable page', async function () {
  await this.draggablePage.open();
});

When('the user drags the drag box 100 pixels down and right', async function () {
  this.initialBox = await this.draggablePage.dragBox.boundingBox();
  expect(this.initialBox).not.toBeNull();
  await this.draggablePage.dragByOffset(100, 100);
});

Then('the drag box should have moved from its initial position', async function () {
  const finalBox = await this.draggablePage.dragBox.boundingBox();
  expect(finalBox).not.toBeNull();
  expect(finalBox.x).toBeGreaterThan(this.initialBox.x);
});

// ── Resizable ───────────────────────────────────────────────────────────────

Given('the user is on the DemoQA Resizable page', async function () {
  await this.resizablePage.open();
});

When('the user drags the resize handle 50 pixels down and right', async function () {
  this.initialSize = await this.resizablePage.getBoxSize();
  expect(this.initialSize).not.toBeNull();

  const handleBox = await this.resizablePage.resizeHandle.boundingBox();
  expect(handleBox).not.toBeNull();

  const startX = handleBox.x + handleBox.width / 2;
  const startY = handleBox.y + handleBox.height / 2;
  await this.resizablePage.page.mouse.move(startX, startY);
  await this.resizablePage.page.mouse.down();
  await this.resizablePage.page.waitForTimeout(200);
  await this.resizablePage.page.mouse.move(startX + 50, startY + 50, { steps: 20 });
  await this.resizablePage.page.waitForTimeout(200);
  await this.resizablePage.page.mouse.up();
  await this.resizablePage.page.waitForTimeout(500);
});

Then('the resizable box dimensions should have increased', async function () {
  const finalSize = await this.resizablePage.getBoxSize();
  expect(finalSize).not.toBeNull();
  expect(finalSize.width).toBeGreaterThan(this.initialSize.width);
  expect(finalSize.height).toBeGreaterThan(this.initialSize.height);
});

// ── Selectable ──────────────────────────────────────────────────────────────

Given('the user is on the DemoQA Selectable page', async function () {
  await this.selectablePage.open();
  await this.selectablePage.openListTab();
});

When('the user clicks the list item {string}', async function (itemName) {
  this.selectableItem = this.selectablePage.getListItem(itemName);
  await this.selectableItem.click();
});

Then('the list item {string} should be active', async function (itemName) {
  await expect(this.selectableItem).toHaveClass(/active/);
});

// ── Sortable ────────────────────────────────────────────────────────────────

Given('the user is on the DemoQA Sortable page', async function () {
  await this.sortablePage.open();
  await this.sortablePage.openListTab();
});

When('the user drags item {string} to item {string}', async function (item1, item2) {
  this.itemsBefore = await this.sortablePage.listItems.allTextContents();
  const one = this.sortablePage.getListItemByText(item1);
  const two = this.sortablePage.getListItemByText(item2);
  await this.sortablePage.dragAndDrop(one, two);
});

Then('the first item in the list should not be {string}', async function (itemName) {
  const itemsAfter = await this.sortablePage.listItems.allTextContents();
  expect(this.itemsBefore[0]).not.toBe(itemsAfter[0]);
});

