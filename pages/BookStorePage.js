'use strict';

const { BasePage } = require('./BasePage');
const { hideAds } = require('../utils/helpers');

class BookStorePage extends BasePage {
  constructor(page) {
    super(page);
    this.searchBox = page.locator('#searchBox');
    this.bookRows = page.locator('table tbody tr, .rt-tbody .rt-tr-group');
    this.loginLink = page.locator('#login');
  }

  async open() {
    await this.navigate('/books');
    await hideAds(this.page);
  }

  async searchFor(title) {
    await this.searchBox.fill(title);
  }
}

module.exports = { BookStorePage };
