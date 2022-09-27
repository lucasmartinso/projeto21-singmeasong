import * as e2eService from "../services/eseService.js";
import { Request, Response } from "express";

export async function reset(req: Request, res: Response) { 
    await e2eService.trucate();
    res.sendStatus(200);
}