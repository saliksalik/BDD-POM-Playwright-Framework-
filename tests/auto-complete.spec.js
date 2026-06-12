const { test, expect } = require('../fixtures/pomFixtures');

test.describe('Auto Complete', () => {
  test('should select single and multiple colors', async ({ autoCompletePage }) => {
    await autoCompletePage.open();

    // Select multiple colors
    await autoCompletePage.selectMultipleColor('Red');
    await autoCompletePage.selectMultipleColor('Green');
    await expect(autoCompletePage.multipleValues).toHaveText(['Red', 'Green']);

    // Select single color
    await autoCompletePage.selectSingleColor('Blue');
    await expect(autoCompletePage.singleValue).toHaveText('Blue');
  });
});
 