import { faker } from "@faker-js/faker"

describe('Test POST upvote', () => {
  it('Post /recommendations/:id/upvote', async() => {
    const recommendation = { 
      name: faker.music.songName(), 
      youtubeLink: "https://www.youtube.com/watch?v=1G4isv_Fylg"
    }
    
    cy.visit('http://localhost:3000/');
    cy.request('POST','http://localhost:5000/recommendations', recommendation).as('recommendationsPost');
    cy.wait('@recommendationsPost');

    cy.get(`#${recommendation.name}`).click();
  })
})