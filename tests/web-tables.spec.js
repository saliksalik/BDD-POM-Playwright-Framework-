const { test, expect } = require('../fixtures/pomFixtures');

test.describe('Web Tables', () => {
  test('should add, search, and delete a record', async ({ webTablesPage }) => {
    await webTablesPage.open();

    const record = {
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice.smith@example.com',
      age: '28',
      salary: '50000',
      department: 'QA'
    };

    // 1. Add Record
    await webTablesPage.clickAdd();
    await webTablesPage.fillRecord(record);

    const newRow = webTablesPage.getRowByEmail(record.email);
    await expect(newRow).toBeVisible();

    // 2. Search Record
    await webTablesPage.searchFor(record.email);
    await webTablesPage.page.waitForTimeout(500);
    await expect(newRow).toBeVisible();

    // 3. Delete Record
    await webTablesPage.deleteRowByEmail(record.email);
    await expect(newRow).toBeHidden();
    
    // Clear search
    await webTablesPage.searchFor('');
  });
});
