import * as dotenv from "dotenv";

dotenv.config();

/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./src/lib/schema.js",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL
  }
};