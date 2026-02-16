import { Theme } from "@/theme";
import { completeHabit } from "@/utils/habits";
import { useTheme } from "@shopify/restyle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pressable, StyleSheet } from "react-native";
import ThemedText from "../themed-text";
import { HABIT_KEY } from "@/constants/storage-constants";

type HabitDisplayProps = {
  habit: {
    id: number;
    name: string;
    isDaily: number;
    description: string | null;
    category: string | null;
    isCompletedToday: number | null;
  };
};

export default function HabitDisplay({ habit }: HabitDisplayProps) {
  const client = useQueryClient();
  const theme = useTheme<Theme>();

  const { mutate } = useMutation({
    mutationFn: ({ id }: { id: number }) => completeHabit(id),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [HABIT_KEY],
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
        {
          borderColor: habit.isCompletedToday
            ? theme.colors.secondary
            : theme.colors.border,
        },
      ]}
      onPress={onPress}
    >
      <ThemedText variant="subheader">{habit.name}</ThemedText>
      <ThemedText variant="caption">{habit.description}</ThemedText>
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
