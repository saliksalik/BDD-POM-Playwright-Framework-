const { test, expect } = require('../fixtures/pomFixtures');

test.describe('Droppable', () => {
  test('should display drag source and drop target', async ({ interactionsPage }) => {
    await interactionsPage.openDroppable();

    // Perform drag and drop
    await interactionsPage.dragAndDrop();

    // Verify dropped status message
    const droppableText = await interactionsPage.droppable.locator('p').textContent();
    expect(droppableText).toBe('Dropped!');
  });
});
