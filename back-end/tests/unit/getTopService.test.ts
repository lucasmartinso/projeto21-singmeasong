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
    it("Have to pick the amout of recommendations order by score desc", async() => {  
        const recommendation = {
            id: 1, 
            name: "Coldplay - Paradise (Official Video)", 
            youtubeLink: "https://www.youtube.com/watch?v=1G4isv_Fylg", 
            score: 0
        }

        jest.spyOn(recommendationRepository, 'getAmountByScore').mockImplementation((): any => {
            return [
                {
                    id: 1, 
                    name: recommendation.name, 
                    youtubeLink: recommendation.youtubeLink, 
                    score: recommendation.score + 10
                },
                {
                    id: 2, 
                    name: recommendation.name, 
                    youtubeLink: recommendation.youtubeLink, 
                    score: recommendation.score + 8
                },
                {
                    id: 3, 
                    name: recommendation.name, 
                    youtubeLink: recommendation.youtubeLink, 
                    score: recommendation.score + 6
                }, 
                {
                    id: 4, 
                    name: recommendation.name, 
                    youtubeLink: recommendation.youtubeLink, 
                    score: recommendation.score + 4
                }, 
                {
                    id: 5, 
                    name: recommendation.name, 
                    youtubeLink: recommendation.youtubeLink, 
                    score: recommendation.score + 3
                }, 
                {
                    id: 6, 
                    name: recommendation.name, 
                    youtubeLink: recommendation.youtubeLink, 
                    score: recommendation.score + 2
                }
            ]
            
        }); 

        const recommendations: Recommendation[] = await recommendationService.getTop(3);
        
        expect(recommendationRepository.getAmountByScore).toBeCalled();
        expect(recommendations[0].id).toBe(recommendation.id); 
        expect(recommendations[0].name).toBe(recommendation.name);
        expect(recommendations[0].youtubeLink).toBe(recommendation.youtubeLink); 
        expect(recommendations[0].score).toBe(recommendation.score + 10);
    }); 
}); 