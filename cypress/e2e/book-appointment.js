import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

/**
 * This is neccessary because 
 * is an error in the page that is tested.
 */
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

/**
 * This necessary because the tested web app is using
 * iframes.
 */
Cypress.Commands.add('getIframeBody', () => {
    // get the iframe > document > body
    // and retry until the body element is not empty
    cy.get('#cal_embed > iframe')
        .its('0.contentDocument.body').should('not.be.empty')
        // wraps "body" DOM element to allow
        // chaining more Cypress commands, like ".find(...)"
        // https://on.cypress.io/wrap
        .then(cy.wrap)
})

Given('Navigate to calendar page', () => {
    cy.visit("https://versicherung.dentolo.de/zahnzusatzversicherung/")
    cy.clearAllLocalStorage()
    cy.get('#usercentrics-root').shadow().find('[data-testid="uc-accept-all-button"]', { timeout: 10000 }).click()
})

When('click on Jetzt beraten lassen', () => {
    // Here in a development environment I will use data-test attribute for 
    cy.get('#lp-pom-button-209').click()

})

When('select a date', () => {
    // Here in a development environment I will use data-test attribute for 
    cy.getIframeBody().find('[aria-label="Dienstag, 20. Dezember – Zeiten verfügbar"]').click()
})

When('select an hour', () => {
    cy.getIframeBody().find('[data-start-time="12:00"]').click()
})

When('confirm the date', () => {
    cy.getIframeBody().find('button[aria-label="Bestätigen 12:00"]').click()
})

Then('customer page registration is open', () => {
    cy.getIframeBody().contains('Termin buchen').should('be.visible')
})
