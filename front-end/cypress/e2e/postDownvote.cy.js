import { faker } from "@faker-js/faker"

describe('Test POST downvote', () => {
  it('Post /recommendations/:id/downvote', async() => {
    const recommendation = { 
      name: faker.music.songName(), 
      youtubeLink: "https://www.youtube.com/watch?v=1G4isv_Fylg"
    }
    
    cy.visit('http://localhost:3000/');
    cy.request('POST','http://localhost:5000/recommendations', recommendation).as('recommendationsPost');

    cy.get(`#${recommendation.name.substring(0,recommendation.name.length-3)}`).click();
    cy.wait('@recommendationsPost');
  })
})