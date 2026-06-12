const { test, expect } = require('../fixtures/pomFixtures');

test.describe('Alerts', () => {
  test('should handle alert, confirm, and prompt dialogs', async ({ page, alertsPage }) => {
    await alertsPage.openAlerts();

    // 1. Basic Alert
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      await dialog.accept();
    });
    await alertsPage.clickAlert();

    // 2. Confirm Alert
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
      await dialog.accept();
    });
    await alertsPage.clickConfirm();
    await expect(alertsPage.confirmResult).toContainText('You selected Ok');

    // 3. Prompt Alert
    const testText = 'Playwright Test';
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('prompt');
      await dialog.accept(testText);
    });
    await alertsPage.clickPrompt();
    await expect(alertsPage.promptResult).toContainText(`You entered ${testText}`);
  });
});
