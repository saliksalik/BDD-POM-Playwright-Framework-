const { test, expect } = require('../fixtures/pomFixtures');

test.describe('Profile', () => {
  test('should show login action for unauthenticated users', async ({ profilePage }) => {
    await profilePage.open();

    // Verify unauthenticated users see link to login
    await expect(profilePage.loginLink).toBeVisible();
    await expect(profilePage.registerLink).toBeVisible();
  });
});
