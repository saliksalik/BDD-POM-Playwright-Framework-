// step-definitions/practice-form.steps.js
//
// Glue code connecting Gherkin steps to PracticeFormPage POM methods.
// RULE: ALL expect() assertions live here — never in pages/.
'use strict';

const { Given, When, Then, Before } = require('@cucumber/cucumber');
const { expect }                    = require('@playwright/test');
const { generateStudentProfile }    = require('../test-data/studentFactory');

// ── Test Data Setup ──────────────────────────────────────────────────────────
// Generate a fresh student profile once per scenario
Before(function () {
  this.student = generateStudentProfile();
});

// ── Step Definitions ─────────────────────────────────────────────────────────

Given('the student is on the DemoQA Practice Form page', async function () {
  await this.practiceFormPage.open();
});

When('the student fills in their first name and last name', async function () {
  await this.practiceFormPage.fillName(this.student.firstName, this.student.lastName);
});

When('the student fills in their email address', async function () {
  await this.practiceFormPage.fillEmail(this.student.email);
});

When('the student selects their gender', async function () {
  await this.practiceFormPage.selectGender(this.student.gender);
});

When('the student fills in their mobile number', async function () {
  await this.practiceFormPage.fillMobile(this.student.mobile);
});

When('the student selects their date of birth', async function () {
  await this.practiceFormPage.fillDateOfBirth(this.student.dateOfBirth);
});

When('the student selects a subject', async function () {
  await this.practiceFormPage.fillSubject(this.student.subject);
});

When('the student selects a hobby', async function () {
  await this.practiceFormPage.selectHobby(this.student.hobby);
});

When('the student fills in their current address', async function () {
  await this.practiceFormPage.fillAddress(this.student.currentAddress);
});

When('the student selects a state and city', async function () {
  await this.practiceFormPage.selectStateAndCity(this.student.state, this.student.city);
});

When('the student submits the form', async function () {
  await this.practiceFormPage.submit();
});

// ── Assertions ───────────────────────────────────────────────────────────────

Then('the confirmation modal should be displayed', async function () {
  await expect(this.practiceFormPage.confirmationModal).toBeVisible();
  await expect(this.practiceFormPage.confirmationModalTitle).toBeVisible();
});

Then('the confirmation modal should contain the student\'s name', async function () {
  const fullName = `${this.student.firstName} ${this.student.lastName}`;
  await expect(this.practiceFormPage.confirmationModal).toContainText(fullName);
});
