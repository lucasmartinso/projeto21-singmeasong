describe('Test GET random', () => {
  it('Get /recommendations/random', async() => {
    cy.visit('http://localhost:3000/');

    cy.get('#random').click(); 
    cy.url().should('equal','http://localhost:3000/random');
  })
})