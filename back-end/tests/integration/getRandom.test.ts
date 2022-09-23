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

describe("Test GET /recommendations/:id", () => { 
    it("Have to answer 200, if the user send the corretly data", async() => { 
        const recommendations: recommendation = await __createRecommendation();
       
        await server.post("/recommendations").send(recommendations); 
        const recomendationId: any = await server.get("/recommendations").send();
        const { status, body }: {status: number, body: object | null } = await server.get(`/recommendations/${recomendationId.body[0].id}`).send();

        expect(status).toBe(200);
        expect(recomendationId.body).toBeInstanceOf(Array); 
        expect(body).not.toBeNull();
        expect(body).toMatchObject(recommendations);
    }); 

    it("Have to answer 404, if recommendationId doesn't exist", async() => { 
        const { status, body }: {status: number, body: object | null } = await server.get(`/recommendations/1`).send();
        console.log(body);

        expect(status).toBe(404); 
        expect(body).not.toBeNull();
    })
}) 

afterAll(async() => { 
    await disconnectPrisma();
})