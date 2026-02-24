import { Theme } from "@/theme";
import { useTheme } from "@shopify/restyle";
import { Pressable, StyleSheet } from "react-native";
import ThemedText from "../themed-text";
import { habitStore } from "@/stores/habitStore";

type HabitDisplayProps = {
  habit: {
    id: number;
    name: string;
    isDaily: number;
    description: string | null;
    isCompletedToday: number | null;
  };
};

export default function HabitDisplay({ habit }: HabitDisplayProps) {
  const theme = useTheme<Theme>();

  const onPress = () => {
    if (habit.isCompletedToday) return;
    habitStore.storeCompleteHabit(habit.id);
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
