const { wait } = require('@testing-library/react');

//note, sometimes cypress gets a cannot set property err of undefined error, fix by restarting cypress

context('Dashboard-change username', () => {
  function login() {
    cy.get('[data-cy=login]').type('test');
    cy.get('[data-cy=password]').type('123456');
    cy.get('[data-cy=login-button]').click();
  }

  function changeUsername() {
    cy.wait(500);
    cy.get('[data-cy=dashboard]').click();
    cy.wait(500);
    cy.get('[data-cy=edit-username]').type('test100');
    cy.get('[data-cy=change-username-button]').click();
  }

  function resetUsername() {
    //reset username to test
    wait(500);
    cy.get('[data-cy=modal-footer]').click();
    cy.get('[data-cy=edit-username]').clear().type('test');
    cy.get('[data-cy=change-username-button]').click();
  }

  function logout() {
    cy.get('.logout').click();
  }

  beforeEach(() => {
    cy.visit('http://localhost:3001/');
    login();
  });

  it('logins, change username to test100 then changes it back to test', () => {
    changeUsername();

    resetUsername();

    // logout();
  });
});
