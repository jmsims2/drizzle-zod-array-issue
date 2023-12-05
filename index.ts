import { pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const test = pgTable("test", {
  salesChannels: text("sales_channels").array(),
});

export const insertTestSchema = createInsertSchema(test, {
  salesChannels: (schema) => schema.salesChannels.array(),
});

const examplePayload = { salesChannels: ["one", "two"] };

const result = insertTestSchema.parse(examplePayload);
