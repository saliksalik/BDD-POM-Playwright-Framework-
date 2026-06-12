const { test, expect } = require('../fixtures/pomFixtures');

test.describe('Links', () => {
  test('should open simple and dynamic links', async ({ linksPage }) => {
    await linksPage.open();

    // 1. Simple Link (opens new tab)
    const newPage = await linksPage.clickSimpleLink();
    await expect(newPage).toHaveURL(/demoqa\.com/);
    await newPage.close();

    // 2. Dynamic Link (opens new tab)
    const newPageDynamic = await linksPage.clickDynamicLink();
    await expect(newPageDynamic).toHaveURL(/demoqa\.com/);
    await newPageDynamic.close();
  });
});
