declare global {
    namespace Cypress {
      interface Chainable<Subject> {
        signIn(username: string, password: string): void;
        logout():void
      }
    }
  }

Cypress.Commands.add('signIn', (username, password) => {
    cy.get('[data-test=username]').type(username)
    cy.get('[data-test=password]').type(password)
    cy.get('#login-button').click()
    
})

Cypress.Commands.add('logout', () => {
    cy.get('.bm-burger-button > button').click()
    cy.get('#logout_sidebar_link').click()
})

export{}