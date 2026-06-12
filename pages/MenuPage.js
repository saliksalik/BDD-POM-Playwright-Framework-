'use strict';

const { BasePage } = require('./BasePage');
const { hideAds } = require('../utils/helpers');

class MenuPage extends BasePage {
  constructor(page) {
    super(page);
    this.mainItem1 = page.getByText('Main Item 1', { exact: true });
    this.mainItem2 = page.getByText('Main Item 2', { exact: true });
    this.subItem = page.getByText('Sub Item', { exact: true }).first();
  }

  async open() {
    await this.navigate('/menu');
    await hideAds(this.page);
  }

  async revealSubItems() {
    // Main Item 2 has the sub-menu — must hover it, not Main Item 1
    await this.mainItem2.hover();
    // Force CSS hover state via JS for headless mode reliability
    await this.page.evaluate(() => {
      const items = document.querySelectorAll('#nav ul li');
      items.forEach(li => {
        const child = li.querySelector('ul');
        if (child) child.style.display = 'block';
      });
    });
  }
}

module.exports = { MenuPage };
