
    export class LoginPage{
         navigate(){
            cy.visit('/')
        }
    
    
         errorMsg(){
          return   cy.get('[data-test=error]')
        }
    
         loginUser(user:any, pass:any){
            cy.get('[data-test=username]').type(user)
            cy.get('[data-test=password]').type(pass)
            cy.get('#login-button').click()
        }
    
         logout(){
            cy.get('.bm-burger-button > button').click()
            cy.get('#logout_sidebar_link').click()
        }
    
        loginLogo(){
            return cy.get('.login_logo')
        }
    
    }
    
  
