describe('Test GET top', () => {
  it('Get /recommendations/top', async() => {
    cy.visit('http://localhost:3000/');

    cy.get('#top').click(); 

    cy.url().should('equal','http://localhost:3000/top')
  })
})