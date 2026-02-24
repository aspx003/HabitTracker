import { Theme } from "@/theme";
import { useTheme } from "@shopify/restyle";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ThemedText from "../themed-text";

type Day = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
type Days = Set<Day>;

type DaySelectorProps = {
  onSelectedDaysChange?: (selectedDays: Set<Day>) => void;
  initialSelectedDays?: Set<Day>;
};

export default function DaySelector({
  onSelectedDaysChange,
  initialSelectedDays = new Set([]),
}: DaySelectorProps) {
  const theme = useTheme<Theme>();
  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const [selectedDays, setSelectedDays] = useState<Days>(initialSelectedDays);

  const onPress = (day: Day) => {
    setSelectedDays((prev) => {
      let newSet: Set<Day>;
      if (prev.has(day)) {
        prev.delete(day);
        newSet = new Set(prev);
      } else {
        newSet = new Set([...prev, day]);
      }
      // Notify parent of changes
      onSelectedDaysChange?.(newSet);
      return newSet;
    });
  };

  return (
    <View style={styles.container}>
      {days.map((day) => (
        <Pressable
          style={[
            styles.dayContainer,
            selectedDays.has(day as Day) && {
              backgroundColor: theme.colors.primary,
            },
          ]}
          key={day}
          onPress={() => onPress(day as Day)}
        >
          <ThemedText
            variant={"body"}
            color={
              selectedDays.has(day as Day) ? "mainBackground" : "textPrimary"
            }
          >
            {day.toLocaleUpperCase()}
          </ThemedText>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 10,
  },
  dayContainer: {
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 3,
    gap: 2,
    borderRadius: 5,
  },
});
