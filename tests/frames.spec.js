const { test, expect } = require('../fixtures/pomFixtures');

test.describe('Frames', () => {
  test('should read heading inside frame', async ({ framesPage }) => {
    await framesPage.openFrames();

    // Verify heading text inside iframe
    const heading = await framesPage.getFrame1HeadingText();
    expect(heading).toContain('This is a sample page');
  });
});
