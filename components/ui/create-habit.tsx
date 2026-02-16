import ThemedButton from "@/components/themed-button";
import DaySelector from "@/components/ui/day-selector";
import { Theme } from "@/theme";
import { getCatgeories } from "@/utils/categories";
import { createHabit } from "@/utils/habits";
import { useTheme } from "@shopify/restyle";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SetStateAction, useState } from "react";
import { StyleSheet, Switch, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import Box from "../box";
import ThemedInput from "../themed-input";
import ThemedText from "../themed-text";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { CATEGORY_KEY, HABIT_KEY } from "@/constants/storage-constants";

export default function CreateHabit() {
  const theme = useTheme<Theme>();
  const queryClient = useQueryClient();

  // For habits
  const { data: categories, error: categoriesError } = useQuery({
    queryKey: [CATEGORY_KEY],
    queryFn: getCatgeories,
  });

  const [habitName, setHabitname] = useState("");
  const [description, setDescription] = useState("");
  const [isDaily, setIsDaily] = useState(true);
  const [categoryId, setCategoryId] = useState<number>();
  let data: { value: string; key: string }[] = [];

  if (categories) {
    data = categories.map((category) => ({
      value: category.name,
      key: category.id + "",
    }));
  }

  const [selectedDays, setSelectedDays] = useState<Set<string>>(new Set());

  const handleDaysChange = (days: Set<string>) => {
    setSelectedDays(days);
  };

  const { mutate: createNewHabit } = useMutation({
    mutationFn: ({
      name,
      description,
      isDaily,
      daysOfWeek,
      categoryId,
    }: {
      name: string;
      categoryId: number;
      isDaily: number;
      description?: string;
      daysOfWeek?: string;
    }) => createHabit(name, categoryId, isDaily, description, daysOfWeek),
    onSuccess: () => {
      setHabitname("");
      setDescription("");
      setIsDaily(true);
      setCategoryId(0);
      setSelectedDays(new Set());
      queryClient.invalidateQueries({
        queryKey: [HABIT_KEY],
      });
    },
  });

  const onPressCreateHabit = () => {
    if (!categoryId) {
      alert("Please select a category");
      return;
    }

    createNewHabit({
      name: habitName,
      categoryId,
      isDaily: isDaily ? 1 : 0,
      description,
      daysOfWeek: isDaily
        ? undefined
        : JSON.stringify(Array.from(selectedDays)),
    });
  };

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
      <ThemedText>Select Category</ThemedText>
      <SelectList
        searchicon={
          <Feather name="search" size={18} color={theme.colors.textPrimary} />
        }
        closeicon={
          <AntDesign name="close" size={18} color={theme.colors.textPrimary} />
        }
        placeholder="Select Category"
        boxStyles={{
          marginVertical: 10,
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        }}
        dropdownTextStyles={{
          color: theme.colors.textPrimary,
        }}
        dropdownStyles={{
          marginVertical: 10,
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        }}
        inputStyles={{
          marginLeft: 10,
          color: theme.colors.textPrimary,
        }}
        searchPlaceholder="Search category"
        setSelected={(val: SetStateAction<number | undefined>) =>
          setCategoryId(val)
        }
        data={data}
        save="key"
      />
      {/* Only open when daily not selected */}
      <ThemedButton label="Create new habit" onPress={onPressCreateHabit} />
      {categoriesError && (
        <ThemedText variant={"error"}>{categoriesError.message}</ThemedText>
      )}
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
