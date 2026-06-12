const { test, expect } = require('../fixtures/pomFixtures');

test.describe('Buttons', () => {
  test('should handle double, right, and dynamic clicks', async ({ buttonsPage }) => {
    await buttonsPage.open();

    // Double click
    await buttonsPage.doubleClick();
    await expect(buttonsPage.doubleClickMessage).toHaveText('You have done a double click');

    // Right click
    await buttonsPage.rightClick();
    await expect(buttonsPage.rightClickMessage).toHaveText('You have done a right click');

    // Dynamic click
    await buttonsPage.dynamicClick();
    await expect(buttonsPage.dynamicClickMessage).toHaveText('You have done a dynamic click');
  });
});
