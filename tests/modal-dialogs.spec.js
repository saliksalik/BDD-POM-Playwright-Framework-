const { test, expect } = require('../fixtures/pomFixtures');

test.describe('Modal Dialogs', () => {
  test('should open and close small and large modals', async ({ alertsPage }) => {
    await alertsPage.openModals();

    // 1. Small Modal
    await alertsPage.openSmallModal();
    await expect(alertsPage.modalTitle).toHaveText('Small Modal');
    await expect(alertsPage.modalBody).toContainText('This is a small modal');
    await alertsPage.closeSmallModal();
    await expect(alertsPage.modalTitle).toBeHidden();

    // 2. Large Modal
    await alertsPage.openLargeModal();
    await expect(alertsPage.modalTitle).toHaveText('Large Modal');
    await expect(alertsPage.modalBody).toContainText('Lorem Ipsum is simply dummy text');
    await alertsPage.closeLargeModal();
    await expect(alertsPage.modalTitle).toBeHidden();
  });
});
