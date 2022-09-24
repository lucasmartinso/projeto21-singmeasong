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

describe("Unit tests about downvote service", () => { 
    /*it.todo("Have to update -1 at score of an recommendation"), async() => {  

        jest.spyOn(recommendationRepository, 'find').mockImplementation((): any => {}); 
        jest.spyOn(recommendationRepository,'updateScore').mockImplementation((): any => {
            return {
                id: 1, 
                name: "Coldplay - Paradise (Official Video)", 
                youtubeLink: "https://www.youtube.com/watch?v=1G4isv_Fylg", 
                score: 0
            }
        }); 
        jest.spyOn(recommendationRepository,'remove').mockImplementation((): any => {}); 

        await recommendationService.downvote(1);
        
        expect(recommendationRepository.find).toBeCalled(); 
        expect(recommendationRepository.updateScore).toBeCalled();
        expect(recommendationRepository.remove).not.toBeCalled();
    });*/

    /*it.todo("Have to delete recommendation if his score is less than -5"), async() => {  

        jest.spyOn(recommendationRepository, 'findByName').mockImplementation((): any => {
            return {
                id: 1, 
                name: "Coldplay - Yellow (Official Video)", 
                youtubeLink: "https://www.youtube.com/watch?v=yKNxeF4KMsY", 
                score: -6
            }
        });  
        jest.spyOn(recommendationRepository, 'remove').mockImplementation((): any => {});
        jest.spyOn(recommendationRepository, 'updateScore').mockImplementation((): any => {}); 
        
        await recommendationService.downvote(1);

        expect(recommendationRepository.remove).toBeCalled();
        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).not.toBeCalled();
    });*/

    it("Have to denied permission to update a nonexistent recommendation", async() => {  

        jest.spyOn(recommendationRepository, 'find').mockImplementation((): any => {}); 
        jest.spyOn(recommendationRepository,'updateScore').mockImplementation((): any => {
            return {
                id: 1, 
                name: "Coldplay - Paradise (Official Video)", 
                youtubeLink: "https://www.youtube.com/watch?v=1G4isv_Fylg", 
                score: 0
            }
        }); 
        jest.spyOn(recommendationRepository,'remove').mockImplementation((): any => {}); 

        const promise = recommendationService.downvote(1);

        expect(promise).rejects.toEqual({
            type: 'not_found', 
            message: ""
        }); 
        
        expect(recommendationRepository.find).toBeCalled(); 
        expect(recommendationRepository.updateScore).not.toBeCalled();
        expect(recommendationRepository.remove).not.toBeCalled();
    });
}); 