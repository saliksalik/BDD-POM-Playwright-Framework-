const { test, expect } = require('../fixtures/pomFixtures');

test.describe('Resizable', () => {
  test('should display resizable box with handle', async ({ resizablePage }) => {
    await resizablePage.open();

    const initialSize = await resizablePage.getBoxSize();
    expect(initialSize).not.toBeNull();

    // Drag the handle to resize
    const handleBox = await resizablePage.resizeHandle.boundingBox();
    expect(handleBox).not.toBeNull();

    await resizablePage.page.mouse.move(handleBox.x + handleBox.width / 2, handleBox.y + handleBox.height / 2);
    await resizablePage.page.mouse.down();
    await resizablePage.page.mouse.move(handleBox.x + handleBox.width / 2 + 50, handleBox.y + handleBox.height / 2 + 50);
    await resizablePage.page.mouse.up();

    const finalSize = await resizablePage.getBoxSize();
    expect(finalSize).not.toBeNull();
    expect(finalSize.width).toBeGreaterThan(initialSize.width);
    expect(finalSize.height).toBeGreaterThan(initialSize.height);
  });
});
