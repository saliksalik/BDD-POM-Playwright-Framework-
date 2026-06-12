const { test, expect } = require('../fixtures/pomFixtures');

test.describe('Selectable', () => {
  test('should highlight a list item on click', async ({ selectablePage }) => {
    await selectablePage.open();
    await selectablePage.openListTab();

    const item = selectablePage.getListItem('Cras justo odio');
    await item.click();

    // Verify it is highlighted
    await expect(item).toHaveClass(/active/);
  });
});
