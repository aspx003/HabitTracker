import React, { useState } from "react";
import Box from "@/components/box";
import ThemedText from "@/components/themed-text";
import { useNameStore } from "@/stores/nameStore";
import { useQuery } from "@tanstack/react-query";
import { getTodayHabits } from "@/utils/habits";
import ThemedLoadingScreen from "@/components/themed-loading-screen";
import HabitDisplay from "@/components/ui/habit-display";
import { FlashList } from "@shopify/flash-list";
import { useGreeting } from "@/hooks/useGreeting";

export default function HomeScreen() {
  const name = useNameStore((state) => state.name);
  const greeting = useGreeting();

  const {
    data: todayHabits,
    isLoading,
    error,
  } = useQuery({
    queryFn: getTodayHabits,
    queryKey: ["habits"],
  });

  return (
    <Box backgroundColor={"mainBackground"} flex={1}>
      <ThemedText variant={"subheader"}>{greeting}</ThemedText>
      <ThemedText variant={"header"}>{name}</ThemedText>

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
