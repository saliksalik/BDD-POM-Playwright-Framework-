const { test, expect } = require('../fixtures/pomFixtures');

test.describe('Login', () => {
  test('should display login form and navigate to registration', async ({ loginPage, page }) => {
    await loginPage.open();

    // Verify login inputs are visible
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();

    // Navigate to registration
    await loginPage.goToRegistration();
    await expect(page).toHaveURL(/register/);
  });
});
