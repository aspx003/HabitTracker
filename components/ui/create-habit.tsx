import ThemedButton from "@/components/themed-button";
import DaySelector from "@/components/ui/day-selector";
import { Theme } from "@/theme";
import { useTheme } from "@shopify/restyle";
import { useState } from "react";
import { StyleSheet, Switch, View } from "react-native";
import Box from "../box";
import ThemedInput from "../themed-input";
import ThemedText from "../themed-text";
import { habitStore } from "@/stores/habitStore";
import { useSelector } from "@legendapp/state/react";

export default function CreateHabit() {
  const theme = useTheme<Theme>();

  const [habitName, setHabitname] = useState("");
  const [description, setDescription] = useState("");
  const [isDaily, setIsDaily] = useState(true);
  const [selectedDays, setSelectedDays] = useState<Set<string>>(new Set());

  const handleDaysChange = (days: Set<string>) => {
    setSelectedDays(days);
  };

  // const isLoading = useSelector(habitStore.isLoading);
  // const error = useSelector(habitStore.error);

  const createNewHabit = async () => {
    if (!habitName) {
      return;
    }
    await habitStore.storeCreateHabit(habitName, isDaily ? 1 : 0, description, isDaily ? undefined : JSON.stringify(Array.from(selectedDays)));
    setHabitname("");
    setDescription("");
    setIsDaily(true);
    setSelectedDays(new Set());
  }

  return (
    <Box gap={"s"}>
      <ThemedText variant={"subheader"}>Add Habit</ThemedText>
      <ThemedInput
        value={habitName}
        onChangeText={setHabitname}
        placeholder="Habit name"
      />
      <ThemedInput
        value={description}
        onChangeText={setDescription}
        placeholder="Habit Description"
      />
      <View style={styles.switch}>
        <ThemedText>Is this habit daily / on some days?</ThemedText>
        <Switch
          thumbColor={theme.colors.primary}
          value={isDaily}
          onValueChange={() => setIsDaily(!isDaily)}
        />
      </View>
      {!isDaily && <DaySelector onSelectedDaysChange={handleDaysChange} />}
      <ThemedButton label="Create new habit" onPress={createNewHabit} />
    </Box>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    color: "white",
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  switch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  boxStyles: {
    color: "white",
  },
});
