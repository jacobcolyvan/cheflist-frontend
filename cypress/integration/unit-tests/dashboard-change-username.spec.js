const { wait } = require('@testing-library/react');

// not fully working

context('Dashboard', () => {
  //what we're testing
  beforeEach(() => {
    cy.visit('http://localhost:3001/'); //link of website to visit
  });

  function login() {
    cy.contains('Sign up');
    cy.contains('Sign In');
    cy.contains('Username');
    cy.contains('Register').should('not.be.visible');
    cy.get('[type="text"]').type('test');
    cy.get('[type="password"]').type('123456');
    cy.get('[type="submit"]').click();
  }

  function changeUsername() {
    cy.wait(500);
    cy.get(':nth-child(3) > a').click();
    cy.wait(500);
    cy.get(':nth-child(1) > .form-input').type('test100');
    cy.get(':nth-child(1) > .submit').click();
  }

  function resetUsername() {
    //reset username to test

    cy.get('.modal__footer > button').click();
    wait(500);
    cy.get(':nth-child(1) > .form-input').type('test');
    cy.get(':nth-child(1) > .submit').click();
  }

  function logout() {
    cy.get('button').click();
  }

  //logged in as user: test, password: 123456
  it('change username', () => {
    login();

    changeUsername();

    resetUsername();

    logout();
    //assertions = checking that things have been done
  });
});
