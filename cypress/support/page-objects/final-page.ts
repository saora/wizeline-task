export class FinalPage{

   headerText(){
    cy.get('.complete-header').then((textTitle) => {
         return textTitle.text()
    })
   }

   headerElement(){
    return cy.get('.complete-header')
   }

    
}