export class ProductPage{
    addProduct(){
        cy.get(':nth-child(1) > .pricebar > .btn_primary').click()
        cy.get('path').click()
        cy.get('.cart_item_label').should('have.length', 1)
    }
 
     removeItem() {
        cy.get('.bm-burger-button > button').click()
        cy.get('#inventory_sidebar_link').click()
        cy.get('.btn_secondary').click()
    }
    addProducts(number:number){
        for(var i=1; i<= number; i++){
            cy.get(`:nth-child(${i}) > .pricebar > .btn_primary`).click() 
        }
    }

     resetApp(){
        cy.get('.bm-burger-button > button').click()
        cy.get('#reset_sidebar_link').click()
        cy.get('#inventory_sidebar_link').click()
    }

     navigateToShopingCart(){
        cy.get('path').click()
    }

    productTitle(){
        return cy.get('.product_label')
    }
}



    


