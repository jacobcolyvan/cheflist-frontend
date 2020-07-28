const { wait } = require('@testing-library/react');

//beforeeach login
//aftereach delete recipe and logout

context('Login/Logout a user', () => {
  //what we're testing
  beforeEach(() => {
    cy.visit('http://localhost:3001/'); //link of website to visit
    login();
  });

  function login() {
    cy.get('[type="text"]').type('test');
    cy.get('[type="password"]').type('123456');
    cy.get('[type="submit"]').click();
  }
  //assertions = checking that things have been done}

  function addRecipe() {
    cy.wait(3000);
    cy.get(':nth-child(2) > a').click();
    cy.get('input').type('chicken{enter}', { delay: 100 });

    cy.get(':nth-child(1) > button').click();
  }

  function deleteRecipe() {
    cy.get('[data-cy=deleteButton]').click();
  }

  function logout() {
    cy.get('.logout');
  }

  it('can login and logout', () => {
    // cy.on('uncaught:exception', (err, runnable) => {
    //   expect(err.message).to.include('something about the error');
    //   document();
    //   return false;
    // });
    addRecipe();
  });

  afterEach(() => {
    deleteRecipe();
    logout();
  });
});
