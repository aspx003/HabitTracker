// schema.ts
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const habits = sqliteTable("habits", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  isDaily: integer("is_daily").notNull().default(1),
  daysOfWeek: text("days_of_week")
});

export type Habit = typeof habits.$inferSelect;

export const habitCompletions = sqliteTable("habit_completions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  habitId: integer("habit_id")
    .notNull()
    .references(() => habits.id, {
      onDelete: "cascade",
    }),
  completed: integer("completed").notNull().default(0), // 0/1
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export type HabitCompletions = typeof habitCompletions.$inferSelect;
