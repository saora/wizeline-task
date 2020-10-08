export class CartPage{
inventoryItem(){
   return cy.get('.inventory_item_name')
}

finish(){
    cy.get('.btn_action').click()
}

cart(){
    cy.get('path').click()
    return cy.get('.subheader')  
}

items(){
    return cy.get('.cart_item_label')
}

}