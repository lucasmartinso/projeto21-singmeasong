import supertest from "supertest";
import app from "../../src/app"
import { __createRecommendation } from "../factories/recommendationsFactory";
import { deleteAllData, disconnectPrisma, connectPrisma } from "../factories/scenaryFactory";
import type { recommendation } from "../../src/types/recommendatiosType";
import { recommendationRepository } from "../../src/repositories/recommendationRepository"

const server = supertest(app); 
jest.setTimeout(30000);

beforeEach(async()=> { 
    await connectPrisma();
    await deleteAllData();
})

describe("Test POST /recommendations/:id/downvote", () => { 
    it("Have to answer 200, if the user send the corretly id and score>5", async() => { 
        const recommendations: recommendation = await __createRecommendation();

        await server.post("/recommendations").send(recommendations); 
        const { body } = await server.get("/recommendations").send();
        const { status }: {status: number} = await server.post(`/recommendations/${body[0].id}/downvote`);

        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Array);
        expect(body[0].id).not.toBeUndefined();
    }); 

    it("Have to answer 404, if the user send an id that doesn't exist", async() => { 
        const { status }: {status: number} = await server.post(`/recommendations/1/downvote`);

        expect(status).toBe(404);
    });  

    it("Have to answer 404 at sixth downvote request, since that video has been excluded", async() => { 
        const recommendations: recommendation = await __createRecommendation();

        await server.post("/recommendations").send(recommendations); 
        const { body } = await server.get("/recommendations").send();
        await recommendationRepository.downvoteScore(body[0].id, "decrement");
        const {body: numberScore} = await server.get("/recommendations").send();
        await server.post(`/recommendations/${body[0].id}/downvote`);
        const { status }: {status: number} = await server.post(`/recommendations/${body[0].id}/downvote`);

        expect(status).toBe(404);
        expect(body).toBeInstanceOf(Array);
        expect(body[0].id).not.toBeUndefined();
        expect(numberScore[0].score).toEqual(-5);
    })
});

afterAll(async() => { 
    await disconnectPrisma();
})