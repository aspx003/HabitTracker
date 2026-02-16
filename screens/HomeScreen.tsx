import Box from "@/components/box";
import ThemedLoadingScreen from "@/components/themed-loading-screen";
import ThemedText from "@/components/themed-text";
import HabitDisplay from "@/components/ui/habit-display";
import { HABIT_KEY } from "@/constants/storage-constants";
import { useGreeting } from "@/hooks/useGreeting";
import { useNameStore } from "@/stores/nameStore";
import { getTodayHabits } from "@/utils/habits";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";

export default function HomeScreen() {
  const name = useNameStore((state) => state.name);
  const greeting = useGreeting();

  const {
    data: todayHabits,
    isLoading,
    error,
  } = useQuery({
    queryFn: getTodayHabits,
    queryKey: [HABIT_KEY],
  });

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
        {!isLoading && (
          <FlashList
            data={todayHabits}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <HabitDisplay habit={item} />}
          />
        )}
      </Box>
    </Box>
  );
}
