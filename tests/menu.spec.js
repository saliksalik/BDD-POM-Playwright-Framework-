const { test, expect } = require('../fixtures/pomFixtures');

test.describe('Menu', () => {
  test('should display main menu items', async ({ menuPage }) => {
    await menuPage.open();

    // Verify main item is visible
    await expect(menuPage.mainItem1).toBeVisible();
    await expect(menuPage.mainItem2).toBeVisible();

    // Hover to reveal sub-items
    await menuPage.revealSubItems();
    await expect(menuPage.subItem).toBeVisible();
  });
});
