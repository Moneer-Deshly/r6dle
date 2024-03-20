import { pgTable, bigint, varchar, timestamp, foreignKey, boolean, integer, serial} from "drizzle-orm/pg-core";

export const dailyOperatorTable = pgTable("daily_operator",
    {
        id: serial("id").primaryKey(),
        operatorName: varchar("operator_name").notNull(),
        date: timestamp("date").defaultNow(),
        guessers: integer("guessers").default(0).notNull(),
        averageNumGuesses: integer("average_numb_guesses").default(0).notNull()
    }
)

export const userTable = pgTable("user",
    {
        id: serial("id").primaryKey(),
        sessionID: varchar("session_id").notNull().unique(),
        streak: integer("streak").default(0).notNull()
    }
)