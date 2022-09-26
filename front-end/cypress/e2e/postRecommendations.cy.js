describe('Test POST recommendations', () => {
  it('Post /recommendations', () => {
    const recommendation = { 
      name: "Coldplay - Paradise (Official Video)", 
      youtubeLink: "https://www.youtube.com/watch?v=1G4isv_Fylg"
    }
    cy.visit('http://localhost:3000/');
    cy.get('#name').type(recommendation.name);
    cy.get('#youtubeLink').type(recommendation.youtubeLink);
    cy.get('#button').click();
  })
})