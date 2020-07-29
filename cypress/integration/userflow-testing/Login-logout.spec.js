function login() {
  cy.get('[data-cy=login]').type('test');
  cy.get('[data-cy=password]').type('123456');
  cy.get('[data-cy=login-button]').click();
  cy.wait(1000); //need this, for the spotify redirect
}

function logout() {
  cy.get('[data-cy=logout-button]').click();
}

before(() => {
  cy.visit('http://localhost:3001/');
});

context('Login/Logout a user', () => {
  it('can login and logout', () => {
    login();
    logout();
  });
});
