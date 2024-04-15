import { dbClient } from '$lib/db';
import { dailyOperatorTable } from '$lib/schema';

export async function load() {

    try {
        const result = await dbClient.select({name: dailyOperatorTable.operatorName, 
            guessers: dailyOperatorTable.guessers, 
            allGuesses: dailyOperatorTable.allGuesses}).from(dailyOperatorTable);
        return {
            name: result[0].name,
            guessers: result[0].guessers,
            allGuesses: result[0].allGuesses
        }
    
    } catch (error) {
        return {}
    }
}