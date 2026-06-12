Feature: DemoQA Elements Module
  As a user
  I want to automate interactions in the Elements module
  So that I can verify checkboxes, radio buttons, dynamic web tables, and mouse clicks

  Scenario: Verify Check Box tree selection
    Given the user is on the DemoQA Check Box page
    When the user expands all checkbox folders
    And the user selects the "Downloads" checkbox node
    Then the result section should display text containing "downloads"

  Scenario: Verify Radio Button selection
    Given the user is on the DemoQA Radio Button page
    When the user selects the "Yes" radio button
    Then the result output should display selected value "Yes"
    When the user selects the "Impressive" radio button
    Then the result output should display selected value "Impressive"

  Scenario: Verify Web Tables CRUD operations
    Given the user is on the DemoQA Web Tables page
    When the user adds a new record with details "Jane", "Smith", "jane.smith@example.com", "28", "95000", "Engineering"
    Then the web table should display the row for "jane.smith@example.com"
    When the user searches for "Smith"
    Then the web table should only show rows containing "Smith"
    When the user deletes the record with email "jane.smith@example.com"
    Then the row for "jane.smith@example.com" should no longer exist in the web table

  Scenario: Verify mouse clicks on Buttons
    Given the user is on the DemoQA Buttons page
    When the user performs a double click
    Then the double click message should display
    When the user performs a right click
    Then the right click message should display
    When the user performs a dynamic left click
    Then the dynamic click message should display

  Scenario: Verify Broken Links and Images
    Given the user is on the DemoQA Broken Links page
    Then the valid image should be visible and have natural width
    And the broken image should be visible and fail to load
    And the valid link and broken link should be visible

  Scenario: Verify Dynamic Properties
    Given the user is on the DemoQA Dynamic Properties page
    Then the enable after button should eventually be enabled
    And the visible after button should be visible

  Scenario: Verify Simple and Dynamic Links
    Given the user is on the DemoQA Links page
    When the user clicks the simple link and switches to the tab
    Then the new tab URL should contain "demoqa.com"
    When the user clicks the dynamic link and switches to the tab
    Then the new tab URL should contain "demoqa.com"

  Scenario: Verify File Upload and Download
    Given the user is on the DemoQA Upload and Download page
    When the user downloads the sample file
    Then the downloaded file name should be valid
    When the user uploads a sample file
    Then the uploaded file path should contain "sample-upload.txt"

