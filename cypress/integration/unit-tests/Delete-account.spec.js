const { wait } = require('@testing-library/react');

//note, sometimes cypress gets a cannot set property err of undefined error, fix by restarting cypress

function login() {
  cy.get('[data-cy=login]').type('test');
  cy.get('[data-cy=password]').type('123456');
  cy.get('[data-cy=login-button]').click();
  cy.wait(1000); //need this, for the spotify redirect
}

function deleteAccount() {
  cy.get('[data-cy=dashboard]').click();
  cy.get('[data-cy=delete-account-button]').click();
  cy.get('[data-cy=delete-account-confirm]').click();
}

function registerAccount() {
  //register account
  cy.get('[data-cy=sign-up-link]').click();
  cy.get('[data-cy=register-username]').type('test');
  cy.get('[data-cy=register-password]').type('123456');
  cy.get('[data-cy=register-password2]').type('123456');
  cy.get('[data-cy=register-button]').click();
}

function logout() {
  cy.get('[data-cy=logout-button]').click();
}

before(() => {
  cy.visit('http://localhost:3001/');
  login();
});

context('Dashboard-change username', () => {
  it('logs in, clicks to dashboard, hits delete account and confirms', () => {
    deleteAccount();
  });
});

after(() => {
  //   registerAccount();
});
