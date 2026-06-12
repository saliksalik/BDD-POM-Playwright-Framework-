const { test, expect } = require('../fixtures/pomFixtures');

test.describe('Tool Tips', () => {
  test('should show tooltips on hover and reset', async ({ toolTipsPage }) => {
    // Navigate: Load the Tool Tips page.
    await toolTipsPage.open();

    // -- Button --
    // Target Element & Trigger
    await toolTipsPage.toolTipButton.hover();
    // Assert
    await expect(toolTipsPage.tooltip).toBeVisible();
    await expect(toolTipsPage.tooltip).toHaveText('You hovered over the Button');
    // Reset
    await toolTipsPage.resetMouse();
    await expect(toolTipsPage.tooltip).toBeHidden();

    // -- Text Field --
    // Target Element & Trigger
    await toolTipsPage.toolTipTextField.hover();
    // Assert
    await expect(toolTipsPage.tooltip).toBeVisible();
    await expect(toolTipsPage.tooltip).toHaveText('You hovered over the text field');
    // Reset
    await toolTipsPage.resetMouse();
    await expect(toolTipsPage.tooltip).toBeHidden();

    // -- Inline Word "Contrary" --
    // Target Element & Trigger
    await toolTipsPage.contraryWord.hover();
    // Assert
    await expect(toolTipsPage.tooltip).toBeVisible();
    await expect(toolTipsPage.tooltip).toHaveText('You hovered over the Contrary');
    // Reset
    await toolTipsPage.resetMouse();
    await expect(toolTipsPage.tooltip).toBeHidden();

    // -- Inline Word "1.10.32" --
    // Target Element & Trigger
    await toolTipsPage.sectionWord.hover();
    // Assert
    await expect(toolTipsPage.tooltip).toBeVisible();
    await expect(toolTipsPage.tooltip).toHaveText('You hovered over the 1.10.32');
    // Reset
    await toolTipsPage.resetMouse();
    await expect(toolTipsPage.tooltip).toBeHidden();
  });
});
