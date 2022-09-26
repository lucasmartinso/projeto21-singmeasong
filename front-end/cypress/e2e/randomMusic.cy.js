import randomUrlGen from "random-youtube-music-video";
import { faker } from "@faker-js/faker"

describe('Test POST random', () => {
  it('Post /recommendations/random', async() => {
    cy.visit('http://localhost:3000/');

    cy.get('#random').click(); 
  })
})