Feature: Student Registration Form
  As a student
  I want to fill out the practice registration form on DemoQA
  So that I can submit my details and see the confirmation

  Scenario: Successfully submit the student registration form with dynamic data
    Given the student is on the DemoQA Practice Form page
    When the student fills in their first name and last name
    And the student fills in their email address
    And the student selects their gender
    And the student fills in their mobile number
    And the student selects their date of birth
    And the student selects a subject
    And the student selects a hobby
    And the student fills in their current address
    And the student selects a state and city
    And the student submits the form
    Then the confirmation modal should be displayed
    And the confirmation modal should contain the student's name
