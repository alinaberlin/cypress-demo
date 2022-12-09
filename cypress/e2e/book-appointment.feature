Feature: Book appointment

    Scenario: Book appointment

        Given Navigate to calendar page
        When click on Jetzt beraten lassen
        And select a date
        And select an hour
        And confirm the date
        Then customer page registration is open