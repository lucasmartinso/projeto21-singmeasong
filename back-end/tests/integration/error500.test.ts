import { jest } from '@jest/globals';
import { Recommendation } from '@prisma/client';
import { recommendationRepository } from '../../src/repositories/recommendationRepository';
import { recommendationService } from '../../src/services/recommendationsService';
import { __createRecommendation } from '../factories/recommendationsFactory';
import * as errors from "../../src/utils/errorUtils"
import supertest from 'supertest';
import app from '../../src/app';

jest.setTimeout(30000);
beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
}); 

afterEach(() => {
    jest.restoreAllMocks();
  });

describe("Unit tests about getByIdOrFail service", () => { 
    it("Have to answer 500 if route doesn't exist ", async() => {  
        jest.spyOn(errors, 'isAppError').mockImplementation((): any => {
            return undefined
        }); 

        const { status }: { status: number } = await supertest(app).get(`/recommendations/1`).send();
        
        expect(status).toBe(500);
    }); 
}); 