Feature: DemoQA Alerts, Frames, and Windows Module
  As a user
  I want to automate interactions in the Alerts, Frames, and Windows module
  So that I can verify dialog handlers, frames text parsing, and modals

  Scenario: Verify Alerts and Prompts dialogs
    Given the user is on the DemoQA Alerts page
    When the user triggers a basic alert dialog
    And the user accepts the confirmation alert dialog
    Then the confirm result should display "You selected Ok"
    When the user inputs "BDD Test User" in the prompt dialog
    Then the prompt result should display "You entered BDD Test User"

  Scenario: Verify Iframe and Nested Frame text contents
    Given the user is on the DemoQA Nested Frames page
    Then the nested frame contents should contain parent text "Parent frame" and child text "Child Iframe"

  Scenario: Verify Small and Large Modal overlays
    Given the user is on the DemoQA Modal Dialogs page
    When the user opens the Small Modal
    Then the modal dialog should be displayed with title "Small Modal" and body containing "This is a small modal"
    When the user closes the modal dialog
    Then the modal dialog should be hidden

  Scenario: Verify Large Modal overlay
    Given the user is on the DemoQA Modal Dialogs page
    When the user opens the Large Modal
    Then the modal dialog should be displayed with title "Large Modal" and body containing "Lorem Ipsum is simply dummy text"
    When the user closes the large modal dialog
    Then the modal dialog should be hidden


  Scenario: Verify Browser Windows
    Given the user is on the DemoQA Browser Windows page
    When the user opens a new tab
    Then the new tab heading should contain "This is a sample page"
    When the user opens a new window
    Then the new window heading should contain "This is a sample page"

  Scenario: Verify Iframe text contents
    Given the user is on the DemoQA Frames page
    Then the frame heading text should contain "This is a sample page"

