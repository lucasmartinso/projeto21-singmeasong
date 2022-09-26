import * as e2eRepository from "../repositories/e2eRepository"

export async function trucate() { 
    await e2eRepository.truncate();
}