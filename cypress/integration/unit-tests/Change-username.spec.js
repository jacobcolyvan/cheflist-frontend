const { wait } = require('@testing-library/react');

//note, sometimes cypress gets a cannot set property err of undefined error, fix by restarting cypress

function login() {
  cy.get('[data-cy=login]').type('test');
  cy.get('[data-cy=password]').type('123456');
  cy.get('[data-cy=login-button]').click();
  cy.wait(1000); //need this, for the spotify redirect
}

function changeUsername() {
  cy.get('[data-cy=dashboard]').click();
  cy.get('[data-cy=edit-username]').type('test100');
  cy.get('[data-cy=change-username-button]').click();
}

function resetUsername() {
  //reset username to test
  cy.get('[data-cy=modal-footer]').click();
  cy.get('[data-cy=edit-username]').clear().type('test');
  cy.get('[data-cy=change-username-button]').click();
}

function logout() {
  cy.get('[data-cy=logout-button]').click();
}

before(() => {
  cy.visit('http://localhost:3001/');
  login();
});

context('Dashboard- Change username', () => {
  it('logs in, change username to test100 then changes it back to test', () => {
    changeUsername();
  });
});
after(() => {
  resetUsername();
});
