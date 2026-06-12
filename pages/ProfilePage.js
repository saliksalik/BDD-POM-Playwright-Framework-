'use strict';

const { BasePage } = require('./BasePage');
const { hideAds } = require('../utils/helpers');

class ProfilePage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameValue = page.locator('#userName-value');
    this.logoutButton = page.locator('button', { hasText: 'Log out' });
    this.loginLink = page.locator('a[href="/login"]').filter({ hasText: /^login$/i }).last();
    this.registerLink = page.locator('a[href="/register"]').filter({ hasText: /^register$/i }).last();
  }

  async open() {
    await this.navigate('/profile');
    await hideAds(this.page);
  }
}

module.exports = { ProfilePage };
