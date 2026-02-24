import Box from "@/components/box";
import ThemedLoadingScreen from "@/components/themed-loading-screen";
import ThemedText from "@/components/themed-text";
import HabitDisplay from "@/components/ui/habit-display";
import { useGreeting } from "@/hooks/useGreeting";
import { useNameStore } from "@/stores/nameStore";
import { FlashList } from "@shopify/flash-list";
import { useSelector } from "@legendapp/state/react";
import { Habit, habitStore } from "@/stores/habitStore";
import { useEffect } from "react";

export default function HomeScreen() {
  const name = useNameStore((state) => state.name);
  const greeting = useGreeting();

  useEffect(() => {
    habitStore.fetchTodayHabits();
  }, []);

  const todayHabits = useSelector(habitStore.todayHabits);
  const isLoading = useSelector(habitStore.isLoading);
  const error = useSelector(habitStore.error);

  return (
    <Box backgroundColor={"mainBackground"} flex={1}>
      <ThemedText variant={"subheader"}>{greeting}</ThemedText>
      <ThemedText color={"secondary"} variant={"header"}>
        {name}
      </ThemedText>

      {/* All our habits */}
      {error && <ThemedText variant={"error"}>{error.message}</ThemedText>}
      {isLoading && <ThemedLoadingScreen />}
      {!isLoading && todayHabits?.length === 0 && (
        <Box>
          <ThemedText variant={"subheader"}>
            No habits for today / create a new habit
          </ThemedText>
        </Box>
      )}
      <Box flex={1} marginTop={"m"}>
        {!isLoading && todayHabits && (
          <FlashList
            data={todayHabits as Habit[]}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <HabitDisplay habit={item} />}
          />
        )}
      </Box>
    </Box>
  );
}
