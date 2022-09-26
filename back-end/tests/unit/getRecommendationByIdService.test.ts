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

describe("Unit tests about downvote service", () => { 
    it("Have to pick the recommendation with the right id", async() => {  
        const recommendation = {
            id: 1, 
            name: "Coldplay - Paradise (Official Video)", 
            youtubeLink: "https://www.youtube.com/watch?v=1G4isv_Fylg", 
            score: 0
        }

        jest.spyOn(recommendationRepository, 'find').mockImplementation((): any => {
            return {
                id: 1, 
                name: recommendation.name, 
                youtubeLink: recommendation.youtubeLink, 
                score: recommendation.score
            }
            
        }); 

        const recommendations: Recommendation = await recommendationService.getById(1);
        
        expect(recommendationRepository.find).toBeCalled();
        expect(recommendations.id).toBe(recommendation.id); 
        expect(recommendations.name).toBe(recommendation.name);
        expect(recommendations.youtubeLink).toBe(recommendation.youtubeLink); 
        expect(recommendations.score).toBe(recommendation.score);
    }); 

    it("Have to denied and send error if recommendation id doesn't exist", async() => { 
       
        jest.spyOn(recommendationRepository, 'find').mockImplementation((): any => {}); 

        const promise = recommendationService.getById(1);

        expect(promise).rejects.toEqual({
            type: 'not_found', 
            message: ""
        }); 
        expect(recommendationRepository.find).toBeCalled(); 
    })
}); 