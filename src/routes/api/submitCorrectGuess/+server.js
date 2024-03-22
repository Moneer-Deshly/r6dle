import { json } from '@sveltejs/kit';
import { dbClient } from '$lib/db';
import { dailyOperatorTable } from '$lib/schema';
import { eq } from 'drizzle-orm';

export async function POST() {
    try {
        // get current count from db
        const count = await dbClient.select({id: dailyOperatorTable.id, guessers: dailyOperatorTable.guessers}).from(dailyOperatorTable);
        // increment by 1
        const newCount = count[0].guessers + 1;
        // upddate db with new
        await dbClient.update(dailyOperatorTable).set({guessers: newCount}).where(eq(count[0].id, dailyOperatorTable.id));

        return json({success: true})
    }
    
    catch(error) {
        return json({success: false})
    }
}