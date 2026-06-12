const { test, expect } = require('../fixtures/pomFixtures');

test.describe('Draggable Component Interactions', () => {
  test.beforeEach(async ({ draggablePage }) => {
    // Given I navigate to the "Draggable" component page
    await draggablePage.open();
  });

  test('Simple tab - Unrestricted dragging', async ({ draggablePage }) => {
    // When I click on the "Simple" tab
    await draggablePage.openSimpleTab();

    // Get initial position of "Drag me" box
    const initialBox = await draggablePage.dragBox.boundingBox();
    expect(initialBox).not.toBeNull();

    // And I drag the "Drag me" box to a new coordinate on the screen
    const dx = 150;
    const dy = 120;
    await draggablePage.dragElementByOffset(draggablePage.dragBox, dx, dy);

    // Get final position
    const finalBox = await draggablePage.dragBox.boundingBox();
    expect(finalBox).not.toBeNull();

    // Then the "Drag me" box should successfully drop and remain at the new location
    // Allowing a small tolerance for minor drag physics offsets
    expect(finalBox.x).toBeCloseTo(initialBox.x + dx, 0);
    expect(finalBox.y).toBeCloseTo(initialBox.y + dy, 0);
  });

  test('Axis Restricted tab - Movement locked to specific axes', async ({ draggablePage }) => {
    // When I click on the "Axis Restricted" tab
    await draggablePage.openAxisTab();

    // --- Testing the X-axis box ---
    const initialXBox = await draggablePage.restrictedX.boundingBox();
    expect(initialXBox).not.toBeNull();

    // And I attempt to drag the "Only X" box diagonally (both x and y offsets)
    await draggablePage.dragElementByOffset(draggablePage.restrictedX, 100, 100);

    const finalXBox = await draggablePage.restrictedX.boundingBox();
    expect(finalXBox).not.toBeNull();

    // Then the "Only X" box should successfully move along the X-axis but its Y-coordinate should remain unchanged
    expect(finalXBox.x).toBeGreaterThan(initialXBox.x);
    expect(Math.abs(finalXBox.y - initialXBox.y)).toBeLessThanOrEqual(1); // within 1px tolerance

    // --- Testing the Y-axis box ---
    const initialYBox = await draggablePage.restrictedY.boundingBox();
    expect(initialYBox).not.toBeNull();

    // When I attempt to drag the "Only Y" box diagonally
    await draggablePage.dragElementByOffset(draggablePage.restrictedY, 100, 100);

    const finalYBox = await draggablePage.restrictedY.boundingBox();
    expect(finalYBox).not.toBeNull();

    // Then the "Only Y" box should successfully move along the Y-axis but its X-coordinate should remain unchanged
    expect(finalYBox.y).toBeGreaterThan(initialYBox.y);
    expect(Math.abs(finalYBox.x - initialYBox.x)).toBeLessThanOrEqual(1); // within 1px tolerance
  });

  test('Container Restricted tab - Movement locked within boundaries', async ({ draggablePage }) => {
    // When I click on the "Container Restricted" tab
    await draggablePage.openContainerTab();

    // And I attempt to drag the "I'm contained within the box" element far outside of the main container boundary
    await draggablePage.dragElementByOffset(draggablePage.containedInBox, 400, 400);

    // Get both element and container bounding boxes AFTER the drag (to align scroll state)
    const finalBoxElement = await draggablePage.containedInBox.boundingBox();
    const containerBox = await draggablePage.containerBox.boundingBox();
    expect(finalBoxElement).not.toBeNull();
    expect(containerBox).not.toBeNull();

    // Then the element's movement should be stopped at the inner edge of the main container
    expect(finalBoxElement.x).toBeGreaterThanOrEqual(containerBox.x);
    expect(finalBoxElement.y).toBeGreaterThanOrEqual(containerBox.y);
    expect(finalBoxElement.x + finalBoxElement.width).toBeLessThanOrEqual(containerBox.x + containerBox.width + 1); // 1px tolerance
    expect(finalBoxElement.y + finalBoxElement.height).toBeLessThanOrEqual(containerBox.y + containerBox.height + 1);

    // When I attempt to drag the "I'm contained within my parent" element far outside of its parent boundary
    await draggablePage.dragElementByOffset(draggablePage.containedInParent, 400, 400);

    // Get both element and parent container bounding boxes AFTER the drag (to align scroll state)
    const finalParentElement = await draggablePage.containedInParent.boundingBox();
    const parentContainerBox = await draggablePage.parentContainer.boundingBox();
    expect(finalParentElement).not.toBeNull();
    expect(parentContainerBox).not.toBeNull();

    // Then the element's movement should be stopped at the inner edge of its parent container
    expect(finalParentElement.x).toBeGreaterThanOrEqual(parentContainerBox.x);
    expect(finalParentElement.y).toBeGreaterThanOrEqual(parentContainerBox.y);
    expect(finalParentElement.x + finalParentElement.width).toBeLessThanOrEqual(parentContainerBox.x + parentContainerBox.width + 1);
    expect(finalParentElement.y + finalParentElement.height).toBeLessThanOrEqual(parentContainerBox.y + parentContainerBox.height + 1);
  });

  test('Cursor Style tab - Cursor attachment points during drag', async ({ draggablePage }) => {
    // When I click on the "Cursor Style" tab
    await draggablePage.openCursorTab();

    // --- Center box ---
    const initialCenter = await draggablePage.cursorCenter.boundingBox();
    expect(initialCenter).not.toBeNull();

    // And I drag the "I will always stick to the center" box
    await draggablePage.dragElementByOffset(draggablePage.cursorCenter, 100, 100);

    const finalCenter = await draggablePage.cursorCenter.boundingBox();
    expect(finalCenter).not.toBeNull();
    // Then the box should move successfully
    expect(finalCenter.x).not.toBe(initialCenter.x);
    expect(finalCenter.y).not.toBe(initialCenter.y);

    // --- Top Left box ---
    const initialTopLeft = await draggablePage.cursorTopLeft.boundingBox();
    expect(initialTopLeft).not.toBeNull();

    // When I drag the "My cursor is at top left" box
    await draggablePage.dragElementByOffset(draggablePage.cursorTopLeft, 100, 100);

    const finalTopLeft = await draggablePage.cursorTopLeft.boundingBox();
    expect(finalTopLeft).not.toBeNull();
    // Then the box should move successfully
    expect(finalTopLeft.x).not.toBe(initialTopLeft.x);
    expect(finalTopLeft.y).not.toBe(initialTopLeft.y);

    // --- Bottom box ---
    const initialBottom = await draggablePage.cursorBottom.boundingBox();
    expect(initialBottom).not.toBeNull();

    // When I drag the "My cursor is at bottom" box
    await draggablePage.dragElementByOffset(draggablePage.cursorBottom, 100, 100);

    const finalBottom = await draggablePage.cursorBottom.boundingBox();
    expect(finalBottom).not.toBeNull();
    // Then the box should move successfully
    expect(finalBottom.x).not.toBe(initialBottom.x);
    expect(finalBottom.y).not.toBe(initialBottom.y);
  });
});
