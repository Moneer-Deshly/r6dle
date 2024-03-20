import { dailyOperatorTable } from '$lib/schema';
import { dbClient } from '../../../lib/db';
import { getRandomOp } from "$lib/helpers"

export async function GET() {

    try {
        await dbClient.delete(dailyOperatorTable);

        const todaysOperator = getRandomOp();

        await dbClient.insert(dailyOperatorTable).values({
                operatorName: todaysOperator.id
        });

        return new Response('Hello Cron!');
    } catch (error) {
        console.error('Error executing cron job:', error);
        return new Response('Cron job failed', { status: 500 });
    }
}