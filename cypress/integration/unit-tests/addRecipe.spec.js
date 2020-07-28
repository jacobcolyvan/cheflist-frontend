const { wait } = require('@testing-library/react');

//beforeeach login
//aftereach delete recipe and logout
function login() {
  cy.get('[type="text"]').type('test');
  cy.get('[type="password"]').type('123456');
  cy.get('[type="submit"]').click();
}

function addRecipe() {
  cy.wait(1000); //one second wait for spotify redirect to take to home
  cy.get('[data-cy=newRecipe]').click();

  cy.get('[data-cy=searchbar]').type('chicken{enter}');
  cy.get(':nth-child(1) > [data-cy=save]').click();
}

function deleteRecipe() {
  cy.get('[data-cy=deleteButton]').click();
}

function logout() {
  cy.get('.logout');
}

context('Add a recipe', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/');
    login();
  });

  it('can login and logout', () => {
    addRecipe();
  });

  // sometimes produces a "Cannot set property 'err' of undefined" this was fixed by restarting our environment
  //disabled afterEach so that we can see changed state
  afterEach(() => {
    //   deleteRecipe();
    //       logout();
  });
});
