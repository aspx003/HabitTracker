import { completeHabit } from "@/utils/habits";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "../themed-text";

type HabitDisplayProps = {
  habit: {
    id: number;
    name: string;
    isDaily: number;
    description: string | null;
    category: string | null;
    color: string | null;
    isCompletedToday: number | null;
  };
};

export default function HabitDisplay({ habit }: HabitDisplayProps) {
  const client = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ id }: { id: number }) => completeHabit(id),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["habits"],
      });
    },
  });

  const onPress = () => {
    if (habit.isCompletedToday) return;

    mutate({
      id: habit.id,
    });
  };

  return (
    <Pressable
      style={[
        styles.container,
        { borderColor: habit.isCompletedToday ? "green" : "gray" },
      ]}
      onPress={onPress}
    >
      <ThemedText style={[styles.habitText, { color: habit.color! }]}>
        {habit.name}
      </ThemedText>
      <ThemedText type="default">{habit.description}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 2,
    padding: 10,
  },
  habitText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
