import { Router } from "express";
import * as e2eController from "../controllers/e2eController.js"

const testsRouter = Router();

testsRouter.post("/e2e/reset", e2eController.reset);


export default testsRouter;
