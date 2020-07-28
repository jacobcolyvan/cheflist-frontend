/// <reference types="cypress" />

context('Test', () => {
  //what we're testing
  beforeEach(() => {
    cy.visit('http://localhost:3001/'); //link of website to visit
  });

  // descriptive of what it should do
  it('can toggle signup and login button text', () => {
    cy.contains('Sign up');
    cy.contains('Sign In');
    cy.contains('Username');
    cy.contains('Register').should('not.be.visible');
    cy.get('[type="text"]').click();
    //assertions = checking that things have been done
  });
});
