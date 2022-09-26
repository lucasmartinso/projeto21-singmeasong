import { faker } from "@faker-js/faker"

Cypress.Commands.add("resetDatabase", () => {
    cy.request("POST", "http://localhost:5000/e2e/reset");
});

Cypress.Commands.add("createRecommendation", () => {
    const recommendation = { 
        name: faker.music.songName(), 
        youtubeLink: "https://www.youtube.com/watch?v=1G4isv_Fylg"
      }
      cy.visit('http://localhost:3000/');
      cy.request('POST','http://localhost:5000/recommendations', recommendation).as("recommendations");
      cy.wait("@recommendations");

      return recommendation;
  });

