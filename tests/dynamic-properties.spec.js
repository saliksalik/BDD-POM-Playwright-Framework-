const { test, expect } = require('../fixtures/pomFixtures');

test.describe('Dynamic Properties', () => {
  test('should reveal and enable elements after delay', async ({ dynamicPropertiesPage }) => {
    await dynamicPropertiesPage.open();

    // Verify button gets enabled
    await expect(dynamicPropertiesPage.enableAfterButton).toBeVisible();
    await dynamicPropertiesPage.waitForEnableButton();
    await expect(dynamicPropertiesPage.enableAfterButton).toBeEnabled();

    // Verify button gets visible
    await expect(dynamicPropertiesPage.visibleAfter).toBeVisible({ timeout: 10000 });
  });
});
