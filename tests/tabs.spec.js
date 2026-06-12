const { test, expect } = require('../fixtures/pomFixtures');

test.describe('Tabs', () => {
  test('should switch between tab panels', async ({ tabsPage }) => {
    await tabsPage.open();

    // Verify "What" tab panel is visible by default
    await expect(tabsPage.whatPanel).toBeVisible();

    // Click "Origin" tab
    await tabsPage.openOriginTab();
    await expect(tabsPage.originPanel).toBeVisible();
    await expect(tabsPage.whatPanel).toBeHidden();
  });
});
