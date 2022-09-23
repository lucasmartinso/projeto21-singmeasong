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

describe("Unit tests about insert service", () => { 
    it("Have to create a recommendation", async() => { 
        const recommendation: recommendation = await __createRecommendation(); 

        jest.spyOn(recommendationRepository, 'findByName').mockImplementation((): any => {}); 
        jest.spyOn(recommendationRepository, 'create').mockImplementation((): any => {}); 

        await recommendationService.insert(recommendation);

        expect(recommendationRepository.findByName).toBeCalled(); 
        expect(recommendationRepository.create).toBeCalled();
    }); 

    it("Have to denied permission to create a duplicated recommendation", async() => { 
        const recommendation: recommendation = await __createRecommendation(); 

        jest.spyOn(recommendationRepository, 'findByName').mockImplementation((): any => {
            return recommendation
        });  
        jest.spyOn(recommendationRepository, 'create').mockImplementation((): any => {});

        const promise = recommendationService.insert(recommendation);

        expect(promise).rejects.toEqual({
            type: 'conflict', 
            message: 'Recommendations names must be unique'
        }); 
        expect(recommendationRepository.create).not.toBeCalled();
    }); 
}); 