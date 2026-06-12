const { test, expect } = require('../fixtures/pomFixtures');

test.describe('Check Box', () => {
  test('should verify tree state for different node levels', async ({ checkBoxPage }) => {
    // Navigation & Setup: Load the page and click the "Expand All" + button.
    await checkBoxPage.open();
    await checkBoxPage.expandAll();

    // -- Global Parent Test (Home) --
    // Click the "Home" checkbox.
    await checkBoxPage.checkNode('Home');
    
    // Assertion: Verify the results box contains strings from all branches.
    await expect(checkBoxPage.resultContainer).toContainText('desktop');
    await expect(checkBoxPage.resultContainer).toContainText('documents');
    await expect(checkBoxPage.resultContainer).toContainText('downloads');

    // Uncheck "Home" to reset the tree to a clean state.
    await checkBoxPage.checkNode('Home');

    // -- Mid-Level Parent Test (Documents) --
    // Click the "Documents" checkbox.
    await checkBoxPage.checkNode('Documents');

    // Assertion: Verify the results box contains "documents", "workspace", "office", and their children.
    await expect(checkBoxPage.resultContainer).toContainText('documents');
    await expect(checkBoxPage.resultContainer).toContainText('workspace');
    await expect(checkBoxPage.resultContainer).toContainText('office');
    await expect(checkBoxPage.resultContainer).toContainText('react');
    await expect(checkBoxPage.resultContainer).toContainText('private');

    // Negative Assertion: Verify the results box does not contain "desktop" or "downloads".
    await expect(checkBoxPage.resultContainer).not.toContainText('desktop');
    await expect(checkBoxPage.resultContainer).not.toContainText('downloads');

    // Uncheck "Documents".
    await checkBoxPage.checkNode('Documents');

    // -- Bottom-Level Parent Test (Downloads) --
    // Click "Downloads".
    await checkBoxPage.checkNode('Downloads');

    // Assertion: Verify it outputs "downloads", "wordFile", and "excelFile".
    await expect(checkBoxPage.resultContainer).toContainText('downloads');
    await expect(checkBoxPage.resultContainer).toContainText('wordFile');
    await expect(checkBoxPage.resultContainer).toContainText('excelFile');
  });
});
