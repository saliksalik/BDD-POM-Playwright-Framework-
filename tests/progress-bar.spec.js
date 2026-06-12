const { test, expect } = require('../fixtures/pomFixtures');

test.describe('Progress Bar', () => {
  test('should reach 100 percent completion', async ({ widgetsPage }) => {
    // Increase timeout since progress bar takes around 10-15s
    test.setTimeout(45000);

    await widgetsPage.openProgressBar();
    await widgetsPage.clickStartProgressBar();
    await widgetsPage.waitForProgressBarComplete();
    
    await expect(widgetsPage.progressBar).toHaveText('100%');
  });
});
