const { test, expect } = require('../fixtures/pomFixtures');

test.describe('Book Store', () => {
  test('should display books and filter by search', async ({ bookStorePage }) => {
    await bookStorePage.open();
    
    // Check book rows are displayed
    await expect(bookStorePage.bookRows.first()).toBeVisible();

    // Filter by search
    const searchTitle = 'Git Pocket Guide';
    await bookStorePage.searchFor(searchTitle);

    // Verify filter works
    const visibleBookLinks = bookStorePage.bookRows.locator('a');
    await expect(visibleBookLinks.first()).toHaveText(searchTitle);
  });
});
