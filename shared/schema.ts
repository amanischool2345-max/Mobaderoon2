import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const initiatives = pgTable("initiatives", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  targetCategory: text("target_category").notNull(),
  goal: text("goal").notNull(),
  timePeriod: text("time_period").notNull(),
  videoUrl: text("video_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const discussions = pgTable("discussions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users);
export const insertInitiativeSchema = createInsertSchema(initiatives).omit({ id: true, createdAt: true });
export const insertDiscussionSchema = createInsertSchema(discussions).omit({ id: true, createdAt: true });

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Initiative = typeof initiatives.$inferSelect;
export type InsertInitiative = z.infer<typeof insertInitiativeSchema>;
export type Discussion = typeof discussions.$inferSelect;
export type InsertDiscussion = z.infer<typeof insertDiscussionSchema>;
