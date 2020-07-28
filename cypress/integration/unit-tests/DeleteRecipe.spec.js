const { wait } = require('@testing-library/react');

function login() {
  cy.get('[data-cy=login]').type('test');
  cy.get('[data-cy=password]').type('123456');
  cy.get('[data-cy=login-button]').click();
  cy.wait(1000); //need this, for the spotify redirect
}

function addRecipe() {
  cy.get('[data-cy=newRecipe]').click();

  cy.get('[data-cy=searchbar]').type('chicken{enter}');
  cy.get(':nth-child(1) > [data-cy=save]').click();
}

function deleteRecipe() {
  cy.wait(1000);
  cy.get('[data-cy=deleteButton]').click();
}

function logout() {
  cy.get('[data-cy=logout-button]').click();
}

before(() => {
  cy.visit('http://localhost:3001/');
  login();
});

context('Delete a recipe', () => {
  it('logs in, accesses search page, enters recipe search term, hits enter and save to favourites then deletes recipe', () => {
    addRecipe();
    deleteRecipe();
  });
});

after(() => {
  //       logout();
});
