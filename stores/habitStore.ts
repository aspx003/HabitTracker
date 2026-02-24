import { observable } from "@legendapp/state";
import { completeHabit, createHabit, deleteHabit, getTodayHabits, updateHabit } from "@/utils/habits";

export type Habit = {
    id: number;
    name: string;
    isDaily: number;
    description: string | null;
    isCompletedToday: number | null;
}

export const habitStore = observable({
    todayHabits: [] as Habit[],
    isLoading: false,
    error: null as Error | null,

    // functions
    async fetchTodayHabits() {
        habitStore.isLoading.set(true);
        try {
            const habits = await getTodayHabits();
            habitStore.todayHabits.set(habits ?? []);
        } catch (error) {
            habitStore.error.set(error as Error);
        } finally {
            habitStore.isLoading.set(false);
        }
    },

    async storeCreateHabit(name: string, isDaily: number, description?: string, daysOfWeek?: string) {
        try {
            await createHabit(name, isDaily, description, daysOfWeek);
            await habitStore.fetchTodayHabits();
        } catch (error) {
            habitStore.error.set(error as Error);
        }
    },

    async storeCompleteHabit(id: number) {
        try {
            await completeHabit(id);
            await habitStore.fetchTodayHabits();
        } catch (error) {
            habitStore.error.set(error as Error);
        }
    },

    async storeDeleteHabit(id: number) {
        try {
            await deleteHabit(id);
            await habitStore.fetchTodayHabits();
        } catch (error) {
            habitStore.error.set(error as Error);
        }
    },

    async storeUpdateHabit(id: number, name: string, description?: string, daysOfWeek?: string, isDaily?: number) {
        try {
            // await updateHabit(id, name, description, daysOfWeek, isDaily);
            await habitStore.fetchTodayHabits();
        } catch (error) {
            habitStore.error.set(error as Error);
        }
    },
});