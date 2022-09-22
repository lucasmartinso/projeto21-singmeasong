import supertest from "supertest";
import app from "../../src/app"
import { recommendation } from "../../src/types/recommendatiosType";
import { __createRecommendation } from "../factories/recommendationsFactory";
import { deleteAllData, disconnectPrisma, connectPrisma } from "../factories/scenaryFactory";

const server = supertest(app); 

beforeEach(async()=> { 
    await connectPrisma();
    await deleteAllData();
})

describe("Test POST /recommendations/:id/upvote", () => { 
    it("Have to answer 200, if the user send the corretly id", async() => { 
        const recommendations: recommendation = await __createRecommendation();

        await server.post("/recommendations").send(recommendations); 
        const { body } = await server.get("/recommendations").send();
        const { status }: {status: number} = await server.post(`/recommendations/${body[0].id}/upvote`);

        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Array);
        expect(body[0].id).not.toBeUndefined();
    }); 

    it("Have to answer 404, if the user send an id that doesn't exist", async() => { 
        const { status }: {status: number} = await server.post(`/recommendations/1/upvote`);

        expect(status).toBe(404);
    }); 
});

afterAll(async() => { 
    await disconnectPrisma();
})