const { test, expect } = require('../fixtures/pomFixtures');

test.describe('Book Store API', () => {
  test('should load Swagger documentation', async ({ bookStoreApiPage }) => {
    await bookStoreApiPage.open();
    await expect(bookStoreApiPage.swaggerUi).toBeVisible();
    await expect(bookStoreApiPage.bookStoreSection).toBeVisible();
  });
});
