import supertest from "supertest";
import app from "../../src/app"
import { recommendation } from "../../src/types/recommendatiosType";
import { __createRecommendation } from "../factories/recommendationsFactory";
import { deleteAllData, disconnectPrisma, connectPrisma } from "../factories/scenaryFactory";

const server = supertest(app); 
jest.setTimeout(30000);

beforeEach(async()=> { 
    await connectPrisma();
    await deleteAllData();
})

describe("Test POST /recommendations", () => { 
    it("Have to answer 201, if the user send the corretly data", async() => { 
        const recommendations: recommendation = await __createRecommendation();
        const { status }: {status: number} = await server.post("/recommendations").send(recommendations); 

        expect(status).toBe(201);
    }); 

    it("Have to answer 409, if the user try to registred the same data", async() => { 
        const recommendations: recommendation = await __createRecommendation(); 

        await server.post("/recommendations").send(recommendations); 
        const { status }: {status: number} = await server.post("/recommendations").send(recommendations); 

        expect(status).toBe(409);
    }); 

    it("Have to answer 422, if the user send data incorretly",async() => { 
        const recommendations: object = {}; 

        const { status }: {status: number} = await server.post("/recommendations").send(recommendations); 

        expect(status).toBe(422);
    }); 
}) 

afterAll(async() => { 
    await disconnectPrisma();
})