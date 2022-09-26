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

describe("Test GET /recommendations/top/:amount", () => { 
    it("Have to answer 200, if sucess and have to match the right return", async() => { 
        const recommendation1: recommendation = await __createRecommendation(); 
        const recommendation2: recommendation = await __createRecommendation();
       
        await server.post("/recommendations").send(recommendation1); 
        await server.post("/recommendations").send(recommendation2); 
        const recomendationId: any = await server.get("/recommendations").send();
        console.log(recomendationId.body);
        await server.post(`/recommendations/${recomendationId.body[0].id}/upvote`).send();
        const { status, body }: {status: number, body: object[] | null } = await server.get(`/recommendations/top/${recomendationId.body.length}`).send();
        console.log(body);

        expect(status).toBe(200); 
        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBeLessThanOrEqual(recomendationId.body.length);
    }); 

    it("Have to answer 404, if recommendationId doesn't exist", async() => { 
        const { status, body }: {status: number, body: any } = await server.get(`/recommendations/top/0`).send();
        console.log(body);

        expect(status).toBe(200); 
        if(status !== 200) expect(status).toBe(500);
        expect(body).not.toBeNull();
        expect(body.length).toBe(0);
    })
}) 

afterAll(async() => { 
    await disconnectPrisma();
})