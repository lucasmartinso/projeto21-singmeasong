import { jest } from '@jest/globals';
import { recommendationRepository } from '../../src/repositories/recommendationRepository';
import { recommendationService } from '../../src/services/recommendationsService';
import { recommendation } from '../../src/types/recommendatiosType';
import { __createRecommendation } from '../factories/recommendationsFactory';

jest.setTimeout(30000);
beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
}); 

afterEach(() => {
    jest.restoreAllMocks();
  });

describe("Unit tests about upvote service", () => { 
    it("Have to update +1 at score of an recommendation", async() => {  

        jest.spyOn(recommendationRepository, 'find').mockImplementation((): any => {
            return { 
                id: 1, 
                name: "Coldplay - Yellow (Official Video)", 
                youtubeLink: "https://www.youtube.com/watch?v=yKNxeF4KMsY", 
                score: 0
            }
        }); 
        jest.spyOn(recommendationRepository,'updateScore').mockImplementation((): any => {}); 


        await recommendationService.upvote(1);
        
        expect(recommendationRepository.find).toBeCalled(); 
        expect(recommendationRepository.updateScore).toBeCalled();
    }); 

    it("Have to denied permission to update a nonexistent recommendation", async() => {  

        jest.spyOn(recommendationRepository, 'findByName').mockImplementation((): any => {});  
        jest.spyOn(recommendationRepository, 'updateScore').mockImplementation((): any => {}); 
        
        const promise = recommendationService.upvote(1);

        expect(promise).rejects.toEqual({
            type: 'not_found', 
            message: ""
        }); 
        expect(recommendationRepository.updateScore).not.toBeCalled();
    }); 
}); 