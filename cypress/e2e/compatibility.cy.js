describe('Browser Compatibility Test', () => {
  it('Loads the homepage', () => {
    cy.visit('/');
    cy.title().should('include', 'The Painted Dream');
    cy.get('main').should('be.visible');
    cy.get('#root').should('not.be.empty');
  });
});
