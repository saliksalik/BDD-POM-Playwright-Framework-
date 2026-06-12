'use strict';

const { BasePage } = require('./BasePage');
const { hideAds } = require('../utils/helpers');

class DatePickerPage extends BasePage {
  constructor(page) {
    super(page);
    this.monthYearInput = page.locator('#datePickerMonthYearInput');
    this.dateTimeInput = page.locator('#dateAndTimePickerInput');
  }

  async open() {
    await this.navigate('/date-picker');
    await hideAds(this.page);
  }

  async selectMonthYear(monthYear) {
    await this.monthYearInput.click();
    await this.monthYearInput.fill(monthYear);
    await this.page.keyboard.press('Enter');
  }
}

module.exports = { DatePickerPage };
