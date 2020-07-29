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

function addPlaylist() {
  //errors out here
  cy.get('[data-cy=get-tracks-button]').click();
  cy.get('[data-cy=save-tracks-button]').click();
  // cy.wait(3000);
  // cy.get('.playlist').click(35, 35);
}

function logout() {
  cy.get('[data-cy=logout-button]').click();
}

before(() => {
  cy.visit('http://localhost:3001/');
  login();
});

context('Add recipe, get playlist', () => {
  it('logs in, searches for a recipe, add a recipe, adds a playlist', () => {
    addRecipe();
    addPlaylist();
  });
});

after(() => {
  // logout();
});
