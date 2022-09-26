import { jest } from '@jest/globals';
import { Recommendation } from '@prisma/client';
import { recommendationRepository } from '../../src/repositories/recommendationRepository';
import { recommendationService } from '../../src/services/recommendationsService';
import { __createRecommendation } from '../factories/recommendationsFactory';

jest.setTimeout(30000);
beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
}); 

afterEach(() => {
    jest.restoreAllMocks();
  });

describe("Unit tests about get service", () => { 
    it("Have to pick the last 10 recommendations", async() => {  
        const recommendation = {
            id: 1, 
            name: "Coldplay - Paradise (Official Video)", 
            youtubeLink: "https://www.youtube.com/watch?v=1G4isv_Fylg", 
            score: 0
        }

        jest.spyOn(recommendationRepository, 'findAll').mockImplementation((): any => {
            return [
                {
                    id: 1, 
                    name: recommendation.name, 
                    youtubeLink: recommendation.youtubeLink, 
                    score: recommendation.score
                }, 
                {
                    id: 2, 
                    name: recommendation.name, 
                    youtubeLink: recommendation.youtubeLink, 
                    score: recommendation.score
                }, 
                {
                    id: 3, 
                    name: recommendation.name, 
                    youtubeLink: recommendation.youtubeLink, 
                    score: recommendation.score
                }, 
                {
                    id: 4, 
                    name: recommendation.name, 
                    youtubeLink: recommendation.youtubeLink, 
                    score: recommendation.score
                }, 
                {
                    id: 5, 
                    name: recommendation.name, 
                    youtubeLink: recommendation.youtubeLink, 
                    score: recommendation.score
                },
                {
                    id: 6, 
                    name: recommendation.name, 
                    youtubeLink: recommendation.youtubeLink, 
                    score: recommendation.score
                }
            ]
        }); 

        const recommendations: Recommendation[] = await recommendationService.get();
        
        expect(recommendations.length).toBeLessThanOrEqual(10);
        expect(recommendationRepository.findAll).toBeCalled();
        expect(recommendations[0].id).toBe(recommendation.id); 
        expect(recommendations[0].name).toBe(recommendation.name);
        expect(recommendations[0].youtubeLink).toBe(recommendation.youtubeLink); 
        expect(recommendations[0].score).toBe(recommendation.score);
    });
}); 