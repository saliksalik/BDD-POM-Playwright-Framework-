const { test, expect } = require('../fixtures/pomFixtures');

test.describe('Radio Button', () => {
  test('should select Yes and Impressive options', async ({ radioButtonPage }) => {
    await radioButtonPage.open();

    // Select Yes
    await radioButtonPage.selectYes();
    await expect(radioButtonPage.selectionResult).toHaveText('Yes');

    // Select Impressive
    await radioButtonPage.selectImpressive();
    await expect(radioButtonPage.selectionResult).toHaveText('Impressive');
  });
});
