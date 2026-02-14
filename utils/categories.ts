import { db } from "@/app/_layout";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getCatgeories = async () => {
  try {
    const data = await db.select().from(categories);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createCategory = async (name: string, color: string) => {
  try {
    await db.insert(categories).values({ name, color, createdAt: new Date() });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = async (id: number) => {
  try {
    await db.delete(categories).where(eq(categories.id, id));
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = async (
  id: number,
  name: string,
  color: string,
) => {
  try {
    await db
      .update(categories)
      .set({ name, color })
      .where(eq(categories.id, id));
  } catch (error) {
    console.log(error);
  }
};
