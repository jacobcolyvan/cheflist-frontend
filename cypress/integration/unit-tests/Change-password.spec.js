const { wait } = require('@testing-library/react');

//note, sometimes cypress gets a cannot set property err of undefined error, fix by restarting cypress

function login() {
  cy.get('[data-cy=login]').type('test');
  cy.get('[data-cy=password]').type('123456');
  cy.get('[data-cy=login-button]').click();
}

function changePassword() {
  cy.wait(750);
  cy.get('[data-cy=dashboard]').click();
  cy.get('[data-cy=current-password]').type('123456');
  cy.get('[data-cy=new-password]').type('234567');
  cy.get('[data-cy=new-password2]').type('234567');
  cy.get('[data-cy=change-password-button]').click();
}

function resetPassword() {
  //reset passback back to 123456
  cy.get('[data-cy=modal-footer]').click();
  cy.get('[data-cy=current-password]').clear().type('234567');
  cy.get('[data-cy=new-password]').clear().type('123456');
  cy.get('[data-cy=new-password2]').clear().type('123456');
  cy.get('[data-cy=change-password-button]').click();
}

function logout() {
  cy.get('[data-cy=logout-button]').click();
}

before(() => {
  cy.visit('http://localhost:3001/');
  login();
});

context('Dashboard-change username', () => {
  it('logins, changes password to 234567 then changes it back to 123456', () => {
    changePassword();
  });
});

after(() => {
  resetPassword();
});
