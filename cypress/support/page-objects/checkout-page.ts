export class CheckOutPage{
    checkOut(){
        cy.get('.btn_action').click()
    }
    
     checkOutFirstName(firstName){
            cy.get('[data-test=firstName]').type(firstName)
    }
     checkOutLastName(lastName){
        cy.get('[data-test=lastName]').type(lastName)
    }
    
     checkOutPostalCode(postalCode){
        cy.get('[data-test=postalCode]').type(postalCode)
    }
    
     checkOutContinue(){
        cy.get('.btn_primary').click()
    }

    checkoutOverView(){
        return cy.get('.subheader')
    }
    
    
    
     checkOutErrorMessage(){
        return cy.get('[data-test=error]')
    
    }
 }