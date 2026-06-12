const { test, expect } = require('../fixtures/pomFixtures');

test.describe('Sortable', () => {
  test('should sort list and grid items', async ({ sortablePage }) => {
    // Navigation: Load the URL.
    await sortablePage.open();

    // List Tab Phase: Explicitly click the "List" tab
    await sortablePage.openListTab();

    // Verify the tab has the active class.
    await expect(sortablePage.listTab).toHaveClass(/active/);

    // Read the text of the first item
    const itemsBefore = await sortablePage.listItems.allTextContents();
    const firstItemText = itemsBefore[0];

    // Drag the first item and drop it onto the fifth item
    const firstListItem = sortablePage.listItems.nth(0);
    const fifthListItem = sortablePage.listItems.nth(4);
    await sortablePage.dragAndDrop(firstListItem, fifthListItem);

    // Assertion: Verify that the element at the first index no longer contains the text
    const itemsAfter = await sortablePage.listItems.allTextContents();
    expect(itemsAfter[0]).not.toBe(firstItemText);

    // Grid Tab Phase: Click the "Grid" tab.
    await sortablePage.openGridTab();

    // Verify the Grid tab is now active.
    await expect(sortablePage.gridTab).toHaveClass(/active/);

    // Read the text of the first grid item.
    const gridItemsBefore = await sortablePage.gridItems.allTextContents();
    const firstGridItemText = gridItemsBefore[0];

    // Drag the first grid item and drop it onto the last grid item.
    const firstGridItem = sortablePage.gridItems.first();
    const lastGridItem = sortablePage.gridItems.last();
    await sortablePage.dragAndDrop(firstGridItem, lastGridItem);

    // Assertion: Verify the text at the first index has changed
    const gridItemsAfter = await sortablePage.gridItems.allTextContents();
    expect(gridItemsAfter[0]).not.toBe(firstGridItemText);
  });
});
