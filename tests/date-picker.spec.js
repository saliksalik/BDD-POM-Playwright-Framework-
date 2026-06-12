const { test, expect } = require('../fixtures/pomFixtures');

test.describe('Date Picker', () => {
  test('should accept a month and year value', async ({ datePickerPage }) => {
    await datePickerPage.open();
    
    // Select Month and Year
    const dateToSelect = '05/24/2026';
    await datePickerPage.selectMonthYear(dateToSelect);

    // Verify input value
    await expect(datePickerPage.monthYearInput).toHaveValue(dateToSelect);
  });
});
