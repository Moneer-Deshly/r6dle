import { dbClient } from '$lib/db';
import { dailyOperatorTable } from '$lib/schema';

export async function load() {

    try {
        const result = await dbClient.select({id: dailyOperatorTable.id,
            name: dailyOperatorTable.operatorName, 
            guessers: dailyOperatorTable.guessers, 
            allGuesses: dailyOperatorTable.allGuesses}).from(dailyOperatorTable);
        return {
            id: result[0].id,
            name: result[0].name,
            guessers: result[0].guessers,
            allGuesses: result[0].allGuesses
        }
    
    } catch (error) {
        return {}
    }
}