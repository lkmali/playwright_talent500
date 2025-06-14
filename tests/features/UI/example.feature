@ui
Feature: Contact Form Submission

  Scenario: Fill and submit the contact form
    Given I open the contact page "http://localhost:3000"
    When I fill the form with the following details:
      | name     | email              | message            |
      | John Doe | john@example.com   | Hello from Gherkin |
    And I submit the form
    Then I should see the confirmation message "Thank you for your message"
