import { faker } from "@faker-js/faker"

describe('Test POST downvote', () => {

  beforeEach(() => { 
    cy.resetDatabase();
  })
  
  it('Have to exclude the post if has score less than -5', async() => {
    const recommendation = { 
      name: faker.music.songName(), 
      youtubeLink: "https://www.youtube.com/watch?v=1G4isv_Fylg"
    }
    
    cy.visit('http://localhost:3000/');
    cy.request('POST','http://localhost:5000/recommendations', recommendation).as('recommendationsPost');

    for(let i=0; i<6; i++) {
      cy.get(`[data-cy="downvote"]`).click();
    }

    cy.wait('@recommendationsPost');
  })
})