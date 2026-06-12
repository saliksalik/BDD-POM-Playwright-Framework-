const { test, expect } = require('../fixtures/pomFixtures');

test.describe('Nested Frames', () => {
  test('should read parent and child frame text', async ({ framesPage }) => {
    await framesPage.openNestedFrames();

    const { parentText, childText } = await framesPage.getNestedFrameTexts();
    expect(parentText).toContain('Parent frame');
    expect(childText).toContain('Child Iframe');
  });
});
