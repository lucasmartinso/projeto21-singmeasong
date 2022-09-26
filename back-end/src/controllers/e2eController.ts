import * as e2eService from "../services/eseService";

export async function reset() { 
    await e2eService.trucate()
}