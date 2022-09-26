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

describe("Unit tests about getRandom service", () => { 
    it("If random number is less than 0.7, have to recommendate an music with score gratener than 10", async() => {  
        const random: number = Math.random() - 0.3;
        const recommendation = {
            id: 1, 
            name: "Coldplay - Paradise (Official Video)", 
            youtubeLink: "https://www.youtube.com/watch?v=1G4isv_Fylg", 
            score: 11
        }

        jest.spyOn(recommendationService, 'getScoreFilter').mockImplementation((): any => {
            return 'gt'
        }); 
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
                    score: recommendation.score + 10
                }
            ]
        }); 


        const recommendations: Recommendation = await recommendationService.getRandom();
        
        expect(recommendationRepository.findAll).toBeCalled();
        expect(recommendations.score).toBeGreaterThan(10); 
    }); 

    it("If random number is gratener than 0.7 or equal, have to recommendate an music with score less than 10", async() => {  
        const random: number = Math.random() + 0.7;
        console.log(random);
        const recommendation = {
            id: 1, 
            name: "Coldplay - Paradise (Official Video)", 
            youtubeLink: "https://www.youtube.com/watch?v=1G4isv_Fylg", 
            score: 7
        }

        jest.spyOn(recommendationService, 'getScoreFilter').mockImplementation((): any => {
            return "lte"
        }); 
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
                    score: recommendation.score - 10
                }
            ]
        }); 


        const recommendations: Recommendation = await recommendationService.getRandom();
        
        expect(recommendationRepository.findAll).toBeCalled();
        expect(recommendations.score).toBeLessThanOrEqual(10); 
    }); 

    it("Have to recommendate a random music with all of then have recommendation's score greater 10 or less or igual than 10", async() => {  
        const random: number = Math.random();
        const recommendation = {
            id: 1, 
            name: "Coldplay - Paradise (Official Video)", 
            youtubeLink: "https://www.youtube.com/watch?v=1G4isv_Fylg", 
            score: 0
        }
        
        if(random>0.7) {
            jest.spyOn(recommendationService, 'getScoreFilter').mockImplementation((): any => {
                return "lte"
            }); 
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
                        score: recommendation.score - 3
                    }
                ]
            }); 
        } else { 
            jest.spyOn(recommendationService, 'getScoreFilter').mockImplementation((): any => {
                return "gt"
            }); 
            jest.spyOn(recommendationRepository, 'findAll').mockImplementation((): any => {
                return [ 
                    { 
                        id: 1, 
                        name: recommendation.name, 
                        youtubeLink: recommendation.youtubeLink, 
                        score: recommendation.score + 30
                    }, 
                    { 
                        id: 2, 
                        name: recommendation.name, 
                        youtubeLink: recommendation.youtubeLink, 
                        score: recommendation.score +20
                    }
                ]
            }); 
        } 

        const recommendations: Recommendation = await recommendationService.getRandom();
        console.log(recommendations);
            
        expect(recommendationRepository.findAll).toBeCalled();
        if(random>0.7) expect(recommendations.score).toBeLessThanOrEqual(10); 
        else expect(recommendations.score).toBeGreaterThan(10); 
    }); 

    it("Have to denied and send error if database doesn't have recommendations", async() => { 

        jest.spyOn(recommendationService, 'getScoreFilter').mockImplementation((): any => {
            return "lte" || "gt"
        }); 
        jest.spyOn(recommendationRepository, 'findAll').mockImplementation((): any => {
            return []
        }); 

        const promise = recommendationService.getRandom();

        expect(promise).rejects.toEqual({
            type: 'not_found', 
            message: ""
        }); 
        expect(recommendationRepository.findAll).toBeCalled();
    })
}); 