Feature: DemoQA Book Store Application Module
  As a user
  I want to automate interactions in the Book Store Application module
  So that I can verify books search, Swagger API documentation, login, and user profile page behavior

  Scenario: Verify Book Store Search and Filter
    Given the user is on the DemoQA Book Store page
    Then the first book row should be visible
    When the user searches for book "Git Pocket Guide"
    Then the visible book title should contain "Git Pocket Guide"

  Scenario: Verify Book Store Swagger API
    Given the user is on the DemoQA Book Store API page
    Then the swagger UI sections should be visible

  Scenario: Verify Login and Registration navigation
    Given the user is on the DemoQA Login page
    Then the username and password inputs should be visible
    When the user navigates to the registration page
    Then the page URL should contain "/register"

  Scenario: Verify Profile for unauthenticated users
    Given the user is on the DemoQA Profile page
    Then the login and register links should be visible
