import { dbClient } from '$lib/db';
import { dailyOperatorTable } from '$lib/schema';

export async function load() {

    try {
        const result = await dbClient.select({name: dailyOperatorTable.operatorName}).from(dailyOperatorTable);

        return {
            name: result[0].name
        }
    
    } catch (error) {
        console.error('Error executing cron job:', error);
        return {}
    }
}