// pages/PracticeFormPage.js
//
// Page Object for the DemoQA Student Registration Practice Form.
// https://demoqa.com/automation-practice-form
//
// Design Rules:
//   ✓ NO assertions (expect) anywhere in this file
//   ✓ Resilient locators: getByRole, getByPlaceholder, getByText, getByLabel
//   ✓ Ad/overlay handling delegated to utils/helpers.js

'use strict';

const { BasePage }           = require('./BasePage');
const { hideAds, scrollIntoCenter } = require('../utils/helpers');

class PracticeFormPage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);

    // ── Form Fields (resilient user-facing locators) ─────────────────────────
    this.firstNameInput   = page.getByPlaceholder('First Name');
    this.lastNameInput    = page.getByPlaceholder('Last Name');
    this.emailInput       = page.getByPlaceholder('name@example.com');
    this.mobileInput      = page.getByPlaceholder('Mobile Number');
    // Subjects is a react-select combobox — identified by its unique ID, not placeholder
    this.subjectInput     = page.locator('#subjectsInput');
    this.addressInput     = page.getByPlaceholder('Current Address');

    // ── Submit button ────────────────────────────────────────────────────────
    this.submitButton     = page.getByRole('button', { name: 'Submit' });

    // ── Confirmation Modal ───────────────────────────────────────────────────
    this.confirmationModal     = page.getByRole('dialog');
    this.confirmationModalTitle = page.getByText('Thanks for submitting the form');
    this.modalCloseButton      = page.getByRole('button', { name: 'Close' });
  }

  // ── Navigation ─────────────────────────────────────────────────────────────

  async open() {
    await this.navigate('/automation-practice-form');
    // Remove ad overlays that cover form elements
    await hideAds(this.page);
  }

  // ── Form Fill Actions ──────────────────────────────────────────────────────

  /**
   * Fills the first and last name fields.
   */
  async fillName(firstName, lastName) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
  }

  /**
   * Fills the email field.
   */
  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  /**
   * Selects the gender radio button by value: 'Male', 'Female', or 'Other'.
   */
  async selectGender(gender) {
    await this.page.getByText(gender, { exact: true }).click();
  }

  /**
   * Fills the mobile number field.
   */
  async fillMobile(mobile) {
    await this.mobileInput.fill(mobile);
  }

  /**
   * Sets the date of birth using the date picker inputs.
   * @param {{ day: string, month: string, year: string }} dob
   */
  async fillDateOfBirth({ day, month, year }) {
    await this.page.locator('#dateOfBirthInput').click();
    // Select month from dropdown
    await this.page.locator('.react-datepicker__month-select').selectOption({ label: month });
    // Select year from dropdown
    await this.page.locator('.react-datepicker__year-select').selectOption({ value: year });
    // Click on the day number
    await this.page
      .locator(`.react-datepicker__day--0${day.padStart(2, '0')}:not(.react-datepicker__day--outside-month)`)
      .first()
      .click();
  }

  /**
   * Types a subject and selects the first autocomplete suggestion.
   * The Subjects field is a react-select combobox — we must click to activate it
   * before typing, then pick the suggestion.
   */
  async fillSubject(subject) {
    await this.subjectInput.click();
    await this.subjectInput.fill(subject);
    // Wait for dropdown option and click the exact match
    await this.page.locator('.subjects-auto-complete__option').first().click();
  }

  /**
   * Checks a hobby checkbox by its label text.
   * @param {string} hobby - 'Sports', 'Reading', or 'Music'
   */
  async selectHobby(hobby) {
    const label = this.page.getByText(hobby, { exact: true });
    await scrollIntoCenter(label);
    await label.click();
  }

  /**
   * Fills the current address textarea.
   */
  async fillAddress(address) {
    await scrollIntoCenter(this.addressInput);
    await this.addressInput.fill(address);
  }

  /**
   * Selects the State and City dropdowns.
   * @param {string} state
   * @param {string} city
   */
  async selectStateAndCity(state, city) {
    // State dropdown
    const stateDropdown = this.page.locator('#state');
    await scrollIntoCenter(stateDropdown);
    await stateDropdown.click();
    await this.page.getByText(state, { exact: true }).click();

    // City dropdown (enabled only after state is selected)
    const cityDropdown = this.page.locator('#city');
    await scrollIntoCenter(cityDropdown);
    await cityDropdown.click();
    await this.page.getByText(city, { exact: true }).click();
  }

  // ── Submission ─────────────────────────────────────────────────────────────

  /**
   * Scrolls the Submit button into view and clicks it.
   */
  async submit() {
    await scrollIntoCenter(this.submitButton);
    await this.submitButton.click();
  }

  // ── State Readers (return values — assertions done in step-definitions) ────

  /**
   * Returns true if the confirmation modal is visible.
   */
  async isConfirmationModalVisible() {
    return await this.confirmationModal.isVisible();
  }

  /**
   * Closes the confirmation modal.
   */
  async closeModal() {
    await this.modalCloseButton.click();
  }
}

module.exports = { PracticeFormPage };
