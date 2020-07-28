context('Login/Logout a user', () => {
  before(() => {
    cy.visit('http://localhost:3001/');
  });

  function login() {
    cy.get('[data-cy=login]').type('test');
    cy.get('[data-cy=password]').type('123456');
    cy.get('[data-cy=login-button]').click();
  }

  function logout() {
    cy.get('[data-cy=logout-button]').click();
  }

  it('can login and logout', () => {
    login();
    logout();
  });
});
