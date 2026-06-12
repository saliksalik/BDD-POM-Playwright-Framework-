'use strict';

const { BasePage } = require('./BasePage');
const { hideAds } = require('../utils/helpers');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.locator('#userName');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login');
    this.newUserButton = page.locator('#newUser');
    this.errorMessage = page.locator('#name');
  }

  async open() {
    await this.navigate('/login');
    await hideAds(this.page);
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async goToRegistration() {
    await this.newUserButton.click();
  }
}

module.exports = { LoginPage };
