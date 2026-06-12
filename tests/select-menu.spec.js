const { test, expect } = require('../fixtures/pomFixtures');

test.describe('Select Menu', () => {
  test('should select options from dropdown menus', async ({ selectMenuPage }) => {
    await selectMenuPage.open();

    // Select standard old style option
    await selectMenuPage.selectOldStyleOption('Blue');
    await expect(selectMenuPage.oldStyleSelect).toHaveValue('1'); // Value of Blue is 1

    // Select multi select cars option
    await selectMenuPage.selectCar('saab');
    const selectedCars = await selectMenuPage.carsSelect.inputValue();
    expect(selectedCars).toBe('saab');
  });
});
