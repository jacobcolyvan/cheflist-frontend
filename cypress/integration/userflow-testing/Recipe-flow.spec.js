context('Add and Delete recipe', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/');
  });

  // the it should be descriptive of what it should do
  function login() {
    cy.contains('Sign up');
    cy.contains('Sign In');
    cy.contains('Username');
    cy.contains('Register').should('not.be.visible');
    cy.get('[type="text"]').type('test');
    cy.get('[type="password"]').type('123456');
    cy.get('[type="submit"]').click();
  }
  //assertions = checking that things have been done}

  function addRecipe() {
    cy.get(':nth-child(2) > a').click();
  }

  function deleteRecipe() {}

  function logout() {
    cy.get('button').click();
  }

  it('Can login, search for a recipe, add a recipe, delete a recipe then logout', () => {
    login();
    logout();
  });
});
