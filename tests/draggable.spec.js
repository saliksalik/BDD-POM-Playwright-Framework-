const { test, expect } = require('../fixtures/pomFixtures');

test.describe('Draggable', () => {
  test('should move drag box on the page', async ({ draggablePage }) => {
    await draggablePage.open();
    
    // Get initial position
    const initialBox = await draggablePage.dragBox.boundingBox();
    expect(initialBox).not.toBeNull();

    await draggablePage.dragByOffset(100, 100);

    // Get final position
    const finalBox = await draggablePage.dragBox.boundingBox();
    expect(finalBox).not.toBeNull();
    expect(finalBox.x).toBeGreaterThan(initialBox.x);
  });
});
