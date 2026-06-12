const { test, expect } = require('../fixtures/pomFixtures');

test.describe('Browser Windows', () => {
  test('should open a new tab and window', async ({ browserWindowsPage }) => {
    await browserWindowsPage.open();

    // 1. Open New Tab
    const newTab = await browserWindowsPage.openNewTab();
    const tabHeadingText = await newTab.locator('#sampleHeading').textContent();
    expect(tabHeadingText).toContain('This is a sample page');
    await newTab.close();

    // 2. Open New Window
    const newWindow = await browserWindowsPage.openNewWindow();
    const windowHeadingText = await newWindow.locator('#sampleHeading').textContent();
    expect(windowHeadingText).toContain('This is a sample page');
    await newWindow.close();
  });
});
