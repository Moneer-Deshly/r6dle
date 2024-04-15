import { pgTable, bigint, varchar, timestamp, foreignKey, boolean, integer, serial} from "drizzle-orm/pg-core";

export const dailyOperatorTable = pgTable("daily_operator",
    {
        id: serial("id").primaryKey(),
        operatorName: varchar("operator_name").notNull(),
        guessers: integer("guessers").default(0).notNull(),
        allGuesses: integer("all_guesses").default(0).notNull()
    }
)

export const userTable = pgTable("user",
    {
        id: varchar("id").primaryKey(),
        streak: integer("streak").default(0).notNull()
    }
)