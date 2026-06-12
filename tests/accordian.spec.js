const { test, expect } = require('../fixtures/pomFixtures');

test.describe('Accordian', () => {
  test('should expand and collapse sections', async ({ widgetsPage }) => {
    await widgetsPage.openAccordian();

    // First section should be expanded by default
    await expect(widgetsPage.accordionContent1).toHaveClass(/show/);

    // Expand second section
    await widgetsPage.clickAccordionHeader2();
    await expect(widgetsPage.accordionContent2).toHaveClass(/show/);
  });
});
