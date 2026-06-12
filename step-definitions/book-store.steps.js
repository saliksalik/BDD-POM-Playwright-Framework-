// step-definitions/book-store.steps.js
'use strict';

const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

// ── Book Store Search ────────────────────────────────────────────────────────

Given('the user is on the DemoQA Book Store page', async function () {
  await this.bookStorePage.open();
});

Then('the first book row should be visible', async function () {
  await expect(this.bookStorePage.bookRows.first()).toBeVisible();
});

When('the user searches for book {string}', async function (title) {
  await this.bookStorePage.searchFor(title);
});

Then('the visible book title should contain {string}', async function (title) {
  const visibleBookLinks = this.bookStorePage.bookRows.locator('a');
  await expect(visibleBookLinks.first()).toHaveText(title);
});

// ── Book Store API ───────────────────────────────────────────────────────────

Given('the user is on the DemoQA Book Store API page', async function () {
  await this.bookStoreApiPage.open();
});

Then('the swagger UI sections should be visible', async function () {
  await expect(this.bookStoreApiPage.swaggerUi).toBeVisible();
  await expect(this.bookStoreApiPage.bookStoreSection).toBeVisible();
});

// ── Login and Registration ───────────────────────────────────────────────────

Given('the user is on the DemoQA Login page', async function () {
  await this.loginPage.open();
});

Then('the username and password inputs should be visible', async function () {
  await expect(this.loginPage.usernameInput).toBeVisible();
  await expect(this.loginPage.passwordInput).toBeVisible();
});

When('the user navigates to the registration page', async function () {
  await this.loginPage.goToRegistration();
});

Then('the page URL should contain {string}', async function (expectedPath) {
  await expect(this.page).toHaveURL(new RegExp(expectedPath));
});

// ── Profile ──────────────────────────────────────────────────────────────────

Given('the user is on the DemoQA Profile page', async function () {
  await this.profilePage.open();
});

Then('the login and register links should be visible', async function () {
  await expect(this.profilePage.loginLink).toBeVisible();
  await expect(this.profilePage.registerLink).toBeVisible();
});
