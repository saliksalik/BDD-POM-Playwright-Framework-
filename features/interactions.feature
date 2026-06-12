Feature: DemoQA Interactions Module
  As a user
  I want to automate interactions in the Interactions module
  So that I can verify drag-and-drop actions

  Scenario: Verify Drag and Drop action
    Given the user is on the DemoQA Droppable page
    When the user drags the source box and drops it on the target box
    Then the target box label should display "Dropped!"

  Scenario: Verify Draggable box positioning
    Given the user is on the DemoQA Draggable page
    When the user drags the drag box 100 pixels down and right
    Then the drag box should have moved from its initial position

  Scenario: Verify Resizable box dimensions
    Given the user is on the DemoQA Resizable page
    When the user drags the resize handle 50 pixels down and right
    Then the resizable box dimensions should have increased

  Scenario: Verify Selectable list items
    Given the user is on the DemoQA Selectable page
    When the user clicks the list item "Cras justo odio"
    Then the list item "Cras justo odio" should be active

  Scenario: Verify Sortable list reordering
    Given the user is on the DemoQA Sortable page
    When the user drags item "One" to item "Two"
    Then the first item in the list should not be "One"

