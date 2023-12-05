import { pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const test = pgTable("test", {
  salesChannels: text("sales_channels").array(),
});

export const insertTestSchema = createInsertSchema(test);

export const insertTestSchema2 = createInsertSchema(test, {
  salesChannels: (schema) => schema.salesChannels.array(),
});

const host = process.env.DB_HOST;
const port = process.env.DB_PORT as unknown as number;
const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

export const client = postgres({
  host,
  port,
  database,
  username,
  password,
});

export const db = drizzle(client, { schema: { test } });

const examplePayload = { salesChannels: ["one", "two"] };

// TS Error here
const payloadParse1 = insertTestSchema.parse(examplePayload);
await db.insert(test).values(payloadParse1);

// No TS Error but the payload fails to parse
const payloadParse2 = insertTestSchema2.parse(examplePayload);
await db.insert(test).values(payloadParse2);
