import { db } from "@/db/db";
import { habitCompletions, habits } from "@/db/schema";
import { getDay } from "date-fns";
import { eq, or, sql } from "drizzle-orm";

export const getAllHabits = async () => {
  try {
    const data = await db.select().from(habits);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createHabit = async (
  name: string,
  isDaily: number,
  description?: string,
  daysOfWeek?: string,
) => {
  try {
    await db.insert(habits).values({
      name,
      description,
      daysOfWeek: isDaily === 1 ? null : daysOfWeek,
      isDaily,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getTodayHabits = async () => {
  const day = dayToStringDay(getDay(new Date()));

  try {
    const data = await db
      .select({
        id: habits.id,
        name: habits.name,
        isDaily: habits.isDaily,
        description: habits.description,
        isCompletedToday: habitCompletions.completed,
      })
      .from(habits)
      .leftJoin(habitCompletions, eq(habitCompletions.habitId, habits.id))
      .where(
        or(
          eq(habits.isDaily, 1),
          sql`EXISTS (SELECT 1 FROM json_each(${habits.daysOfWeek}) WHERE value = ${day})`,
        ),
      );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteHabit = async (id: number) => {
  try {
    await db.delete(habits).where(eq(habits.id, id));
  } catch (error) {
    console.log(error);
  }
};

export const updateHabit = async ({
  id,
  name,
  description,
  daysOfWeek,
  isDaily,
}: typeof habits.$inferInsert) => {
  try {
    if (id) {
      await db
        .update(habits)
        .set({ name, description, daysOfWeek, isDaily })
        .where(eq(habits.id, id));
    }
  } catch (error) {
    console.log(error);
  }
};

export const completeHabit = async (id: number) => {
  try {
    const someData = await db.insert(habitCompletions).values({
      habitId: id,
      completed: 1,
      createdAt: new Date(),
    });
  } catch (error) {
    console.log(error);
  }
};

const dayToStringDay = (num: number) => {
  switch (num) {
    case 0:
      return "sun";
    case 1:
      return "mon";
    case 2:
      return "tue";
    case 3:
      return "wed";
    case 4:
      return "thu";
    case 5:
      return "fri";
    case 6:
      return "sat";
  }
};
