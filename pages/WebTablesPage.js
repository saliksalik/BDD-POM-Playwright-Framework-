// pages/WebTablesPage.js
'use strict';

const { BasePage } = require('./BasePage');
const { hideAds, scrollIntoCenter } = require('../utils/helpers');

class WebTablesPage extends BasePage {
  constructor(page) {
    super(page);

    this.addButton = page.locator('#addNewRecordButton');
    this.searchBox = page.locator('#searchBox');

    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#userEmail');
    this.ageInput = page.locator('#age');
    this.salaryInput = page.locator('#salary');
    this.departmentInput = page.locator('#department');
    this.submitButton = page.locator('#submit');

    // DemoQA uses a React-table (div-based grid), not a real <table> element
    this.gridTable = page.locator('.ReactTable');
  }

  async open() {
    await this.navigate('/webtables');
    await hideAds(this.page);
  }

  async clickAdd() {
    await this.addButton.click();
  }

  async fillRecord({ firstName, lastName, email, age, salary, department }) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.ageInput.fill(age);
    await this.salaryInput.fill(salary);
    await this.departmentInput.fill(department);
    await this.submitButton.click();
  }

  async searchFor(text) {
    await this.searchBox.fill(text);
  }

  getRowByEmail(email) {
    return this.page.getByRole('row', { name: new RegExp(email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) });
  }

  async deleteRowByEmail(email) {
    const row = this.getRowByEmail(email);
    const deleteButton = row.locator('[title="Delete"]');
    await deleteButton.click();
  }
}

module.exports = { WebTablesPage };
