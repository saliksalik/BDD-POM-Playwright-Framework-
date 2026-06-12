Feature: Text Box Form Submission
  As a user
  I want to fill out the Text Box form on DemoQA
  So that I can verify my entered details are successfully submitted and displayed

  Scenario: Successfully submit the text box form with custom details
    Given the user is on the DemoQA Text Box page
    When the user fills the text box form with name "John Doe", email "john.doe@example.com", current address "123 Main St", and permanent address "456 Elm St"
    And the user submits the text box form
    Then the submitted details should be displayed below the form
    And the output name should contain "John Doe"
    And the output email should contain "john.doe@example.com"
    And the output current address should contain "123 Main St"
    And the output permanent address should cont ain "456 Elm St"
