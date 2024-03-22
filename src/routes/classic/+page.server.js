import { dbClient } from '$lib/db';
import { dailyOperatorTable } from '$lib/schema';

export async function load() {

    try {
        const result = await dbClient.select({name: dailyOperatorTable.operatorName, guessers: dailyOperatorTable.guessers}).from(dailyOperatorTable);
        console.log("The array is: ", result)
        return {
            name: result[0].name,
            guessers: result[0].guessers
        }
    
    } catch (error) {
        console.error('Error executing cron job:', error);
        return {}
    }
}