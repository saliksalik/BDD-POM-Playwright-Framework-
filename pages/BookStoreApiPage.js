'use strict';

const { BasePage } = require('./BasePage');
const { hideAds } = require('../utils/helpers');

class BookStoreApiPage extends BasePage {
  constructor(page) {
    super(page);
    this.swaggerUi = page.locator('section.swagger-ui').first();
    this.bookStoreSection = page.getByText('BookStore', { exact: false }).first();
  }

  async open() {
    await this.navigate('/swagger');
    await hideAds(this.page);
  }
}

module.exports = { BookStoreApiPage };
