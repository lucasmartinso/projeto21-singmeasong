import randomUrlGen from "random-youtube-music-video";
import { faker } from "@faker-js/faker"

describe('Test POST recommendations', () => {
  it('Post /recommendations', async() => {
    const recommendation = { 
      name: faker.music.songName(), 
      youtubeLink: "https://www.youtube.com/watch?v=1G4isv_Fylg"
    }
    cy.visit('http://localhost:3000/');
    cy.get('#name').type(recommendation.name);
    cy.get('#youtubeLink').type(recommendation.youtubeLink);
    
    cy.intercept('POST', "http://localhost:5000/recommendations").as("recommendation")

    cy.get('#button').click();

    cy.wait("@recommendation");
  })
})