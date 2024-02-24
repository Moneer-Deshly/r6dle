import { pgTable, bigint, varchar, timestamp, foreignKey, boolean, integer, serial} from "drizzle-orm/pg-core";

export const operatorData = pgTable("operator_data",
    {
        id: serial("id").primaryKey(),
        operatorName: varchar("operator_name").notNull(),
        date: timestamp("date"),
        guessers: integer("guessers").default(0).notNull(),
        averageNumGuesses: integer("average_numb_guesses").default(0).notNull()
    }
)

export const userData = pgTable("user_data",
    {
        id: serial("id").primaryKey(),
        sessionID: varchar("session_id").notNull().unique(),
        streak: integer("streak").default(0).notNull()
    }
)