import { faker }from "@faker-js/faker"
import dotenv from "dotenv";
import randomUrlGen from "random-youtube-music-video";
dotenv.config();

export async function __createRecommendation() { 
    const songName: string = faker.music.songName();
    const youtubeLink: string = await randomUrlGen.getRandomMusicVideoUrl();

    return { 
        name: songName, 
        youtubeLink: youtubeLink
    }
}