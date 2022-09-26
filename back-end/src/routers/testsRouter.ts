import { Router } from "express";
import { reset } from "../controllers/e2eController"

const  testsRouter = Router();

testsRouter.post("/e2e/reset", reset);


export default testsRouter;
