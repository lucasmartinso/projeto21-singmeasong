import supertest from "supertest";
import app from "../../src/app"
import { __createRecommendation } from "../factories/recommendationsFactory";
import { deleteAllData, disconnectPrisma } from "../factories/scenaryFactory";

const server = supertest(app); 

beforeEach(async()=> { 
    await deleteAllData()
})

describe("Test POST /recommendations/:id/downvote", () => { 
    it("Have to answer 200, if the user send the corretly data", async() => { 
        const recommendations = await __createRecommendation();

        await server.post("/recommendations").send(recommendations); 
        const { body } = await server.get("/recommendations").send();
        const { status } = await server.post(`/recommendations/${body[0].id}/downvote`);

        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Array);
        expect(body[0].id).not.toBeUndefined();
    }); 

    it("Have to answer 404, if the user send an id that doesn't exist", async() => { 
        const { status } = await server.post(`/recommendations/1/downvote`);

        expect(status).toBe(404);
    }); 
});

afterAll(async() => { 
    await disconnectPrisma();
})