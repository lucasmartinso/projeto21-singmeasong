import supertest from "supertest";
import app from "../../src/app"
import { __createRecommendation } from "../factories/recommendationsFactory";
import { deleteAllData, disconnectPrisma, connectPrisma } from "../factories/scenaryFactory";

const server = supertest(app); 
jest.setTimeout(30000);

beforeEach(async()=> { 
    await connectPrisma();
    await deleteAllData();
})

describe("Test GET /recommendations", () => { 
    it("Have to answer 200, if the user send the corretly data", async() => { 
        const { status, body }: {status: number, body: any} = await server.get("/recommendations").send();

        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBeLessThanOrEqual(10);
    }); 
}) 

afterAll(async() => { 
    await disconnectPrisma();
})