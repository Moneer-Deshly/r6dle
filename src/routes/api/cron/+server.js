import { dailyOperatorTable } from '$lib/schema';

export async function GET() {

    try {
        console.log('Attempting to insert into daily_operator'); // Log before attempting to insert

        const insertResult = await dailyOperatorTable.insert(dailyOperatorTable).values({
            // Provide the values for the new row
                operatorName: "ash",
                // You can add other fields as necessary
        });

        return new Response('Hello Cron!');
    } catch (error) {
        console.error('Error executing cron job:', error); // Log any errors
        return new Response('Cron job failed', { status: 500 });
    }
}
