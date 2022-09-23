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

        jest.spyOn(recommendationRepository, 'findByName').mockImplementation((): any => {
            return { recommendation }
        }); 
        jest.spyOn(recommendationService, 'insert').mockImplementation((): any => {
            return { recommendation }
        }); 

        await recommendationService.insert(recommendation);

        expect(recommendationRepository.findByName).toBeCalled(); 
        expect(recommendationRepository.create).toBeCalled();
    }); 

    it("Have to create a recommendation", async() => { 
        const recommendation: recommendation = await __createRecommendation(); 

        jest.spyOn(recommendationRepository, 'findByName').mockImplementation((): any => {
            return { recommendation }
        }); 
        jest.spyOn(recommendationService, 'insert').mockImplementation((): any => {
            return { recommendation }
        }); 

        await recommendationService.insert(recommendation);

        expect(recommendationRepository.findByName).toBeCalled(); 
        expect(recommendationRepository.create).toBeCalled();
    }); 
})