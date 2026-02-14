import { Colors } from "@/constants/theme";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

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
              backgroundColor: Colors.light.tint,
            },
          ]}
          key={day}
          onPress={() => onPress(day as Day)}
        >
          <Text style={styles.text}>{day.toLocaleUpperCase()}</Text>
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
  text: {
    color: "white",
  },
  dayContainer: {
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.light.tint,
    padding: 10,
    paddingHorizontal: 3,
    gap: 2,
    borderRadius: 5,
  },
});
