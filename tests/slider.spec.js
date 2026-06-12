const { test, expect } = require('../fixtures/pomFixtures');

test.describe('Slider', () => {
  test('should change range slider value', async ({ widgetsPage }) => {
    await widgetsPage.openSlider();

    // Set slider value
    const targetValue = 85;
    await widgetsPage.setSliderValue(targetValue);

    // Verify value displayed
    await expect(widgetsPage.sliderValue).toHaveValue(targetValue.toString());
  });
});
