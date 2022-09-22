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

describe("Test GET /recommendations/:id", () => { 
    it("Have to answer 200, if the user send the corretly data", async() => { 
        const { status, body }: {status: number, body: any} = await server.get("/recommendations/:id").send();
        console.log(body)

        expect(status).toBe(200);
    }); 
}) 

afterAll(async() => { 
    await disconnectPrisma();
})