const { wait } = require('@testing-library/react');

//note, sometimes cypress gets a cannot set property err of undefined error, fix by restarting cypress

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

before(() => {
  cy.visit('http://localhost:3001/');
});

context('Register user', () => {
  it('Registers a user which should auto login after hitting register', () => {
    registerAccount();
  });
});

after(() => {
  deleteAccount();
});
