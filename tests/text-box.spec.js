const { test, expect } = require('../fixtures/pomFixtures');

test.describe('TextBox', () => {
  test('should successfully submit the text box form', async ({ textBoxPage }) => {
    await textBoxPage.open();

    const name = 'John Doe';
    const email = 'john@example.com';
    const currentAddress = '123 Main St';
    const permanentAddress = '456 Oak Ave';

    await textBoxPage.fillForm(name, email, currentAddress, permanentAddress);
    await textBoxPage.submit();

    // Verify output area contains submitted details
    await expect(textBoxPage.outputArea).toBeVisible();
    await expect(textBoxPage.outputArea.locator('#name')).toContainText(name);
    await expect(textBoxPage.outputArea.locator('#email')).toContainText(email);
    await expect(textBoxPage.outputArea.locator('#currentAddress')).toContainText(currentAddress);
    await expect(textBoxPage.outputArea.locator('#permanentAddress')).toContainText(permanentAddress);
  });
});
