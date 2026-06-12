Feature: DemoQA Widgets Module
  As a user
  I want to automate interactions in the Widgets module
  So that I can verify accordion collapses, range slider value changes, and progress bar synchronization

  Scenario: Verify Accordion tab expand/collapse
    Given the user is on the DemoQA Accordian page
    Then the first accordion section should be expanded
    When the user clicks the second accordion header
    Then the second accordion section should be expanded

  Scenario: Verify Slider input value changes
    Given the user is on the DemoQA Slider page
    When the user sets the range slider to value 80
    Then the slider text input value should display "80"

  Scenario: Verify Progress Bar complete synchronization
    Given the user is on the DemoQA Progress Bar page
    When the user clicks the start progress bar button
    Then the progress bar should eventually reach 100% complete

  Scenario: Verify Auto Complete color selections
    Given the user is on the DemoQA Auto Complete page
    When the user selects multiple colors "Red" and "Green"
    Then the multiple autocomplete values should display "Red" and "Green"
    When the user selects single color "Blue"
    Then the single autocomplete value should display "Blue"

  Scenario: Verify Date Picker input selection
    Given the user is on the DemoQA Date Picker page
    When the user selects date "05/24/2026"
    Then the date picker input value should display "05/24/2026"

  Scenario: Verify Menu navigation and visibility
    Given the user is on the DemoQA Menu page
    Then the main menu items should be visible
    When the user hovers over the sub-menu triggers
    Then the sub item should be visible

  Scenario: Verify Select Menu options
    Given the user is on the DemoQA Select Menu page
    When the user selects old style option "Blue"
    Then the old style select value should be "1"
    When the user selects car option "saab"
    Then the car select value should be "saab"

  Scenario: Verify Tab panel switches
    Given the user is on the DemoQA Tabs page
    Then the what tab panel should be visible
    When the user switches to the origin tab panel
    Then the origin tab panel should be visible
    And the what tab panel should be hidden

  Scenario: Verify Tool Tips hover content
    Given the user is on the DemoQA Tool Tips page
    When the user hovers over the tooltip button
    Then the tooltip message should contain "You hovered over the Button"

