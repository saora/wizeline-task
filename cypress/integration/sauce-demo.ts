import {LoginPage } from "../support/page-objects/login-page"
import {ProductPage} from "../support/page-objects/product-page"
import {CheckOutPage} from '../support/page-objects/checkout-page'
import {CartPage} from '../support/page-objects/cart-page'
import {FinalPage} from '../support/page-objects/final-page'

describe('Wizeline Automation Challenge', () => {
    let data: {}
    const login = new LoginPage()
    const checkOut = new CheckOutPage() 
    const cartItems = new CartPage()
    const final = new FinalPage()
    const product = new ProductPage()

    beforeEach(() => {
        cy.fixture('credentials').then((user) => {
            data = user
        })
        login.navigate()
    })



   it("1. Login with a valid user", () => {
      login.loginUser(data[0].name, data[0].password)
      login.errorMsg().should('not.be.visible')
      product.productTitle().should('contain', 'Products')
    })

    it("2. Login with an invalid user", () => {
        login.loginUser(data[1].name, data[1].password)
        login.errorMsg().should('contain', 'Epic sadface:')
        
    })

    it("3. Logout from product’s page", () => {
        login.loginUser(data[0].name, data[0].password)
        login.logout()
        login.loginLogo().should('be.visible')
    })


    it('4. Navigate to the shopping cart', () => {
        login.loginUser(data[0].name, data[0].password)
        cartItems.cart().should('contain', 'Your Cart')
    })


    it('5. Add a single item to the shopping cart', () => {
        login.loginUser(data[0].name, data[0].password)
        product.addProducts(1)
        product.navigateToShopingCart()
        cartItems.items().should('have.length', 1)
        product.resetApp()
    })

    it('6. Add multiple items to the shopping cart', () => {
        login.loginUser(data[0].name, data[0].password)
        product.addProducts(3)
        product.navigateToShopingCart()
        cartItems.items().should('have.length', 3)
    })

    it('7. Continue with missing mail information', () => {
        login.loginUser(data[0].name, data[0].password)
        product.navigateToShopingCart()
        checkOut.checkOut()
        checkOut.checkOutFirstName('Salvador')
        checkOut.checkOutLastName('Ortuno')
        checkOut.checkOutContinue()
        checkOut.checkOutErrorMessage().should('contain',"Error")
    })

    it('8. Fill user’s information', () => {
        login.loginUser(data[0].name, data[0].password)
        product.navigateToShopingCart()
        checkOut.checkOut()
        checkOut.checkOutFirstName('Salvador')
        checkOut.checkOutLastName('Ortuno')
        checkOut.checkOutPostalCode('09800')
        checkOut.checkOutContinue()
        checkOut.checkoutOverView().should('be.visible')
    })

    it('9. Final order items', () => {
        login.loginUser(data[0].name, data[0].password)
        product.navigateToShopingCart()
        cartItems.inventoryItem().then(($item) => {
            const txt = $item.text()
            cy.wrap(txt)
            checkOut.checkOut()
            checkOut.checkOutFirstName('Mark')
            checkOut.checkOutLastName('Jhonson')
            checkOut.checkOutPostalCode('08500')
            checkOut.checkOutContinue()
            checkOut.checkoutOverView().should('be.visible')
            cartItems.inventoryItem().should(($item2) => {
              expect($item2.text()).eq(txt)
            })
          }) 
    })

    it('10. Complete a purchase', () => {
        login.loginUser(data[0].name, data[0].password)
        product.navigateToShopingCart()
        cartItems.inventoryItem().then(($item) => {
            const txt = $item.text()
            cy.wrap(txt)
            checkOut.checkOut()
            checkOut.checkOutFirstName('Mark')
            checkOut.checkOutLastName('Jhonson')
            checkOut.checkOutPostalCode('08500')
            checkOut.checkOutContinue()
            checkOut.checkoutOverView().should('be.visible')
            cartItems.inventoryItem().should(($item2) => {
              expect($item2.text()).eq(txt)
            })
          }) 

        cartItems.finish()
        final.headerElement().should((text)=> {
            expect(text.text()).eq('THANK YOU FOR YOUR ORDER')
        })
    })

})