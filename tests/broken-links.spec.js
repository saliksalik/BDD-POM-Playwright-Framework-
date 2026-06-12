const { test, expect } = require('../fixtures/pomFixtures');

test.describe('Broken Links - Images', () => {
  test('should display valid and broken resources', async ({ brokenLinksPage }) => {
    await brokenLinksPage.open();

    // Verify valid image is loaded successfully
    await expect(brokenLinksPage.validImage).toBeVisible();
    await expect(brokenLinksPage.validImage).toHaveAttribute('src', '/images/Toolsqa.jpg');

    // Verify broken image fails to load
    await expect(brokenLinksPage.brokenImage).toBeVisible();
    await expect(brokenLinksPage.brokenImage).toHaveAttribute('src', '/images/Toolsqa_1.jpg');

    // Verify links exist
    await expect(brokenLinksPage.validLink).toBeVisible();
    await expect(brokenLinksPage.brokenLink).toBeVisible();
  });
});
