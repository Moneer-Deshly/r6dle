import { dbClient } from "../lib/db"
import { operatorData } from "../lib/schema"

export const load = async() => {
    const rows = await dbClient.select().from(operatorData)
    console.log(rows)
    return { rows }
}