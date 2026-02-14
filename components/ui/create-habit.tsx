import DaySelector from "@/components/day-selector";
import ThemedButton from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { getCatgeories } from "@/utils/categories";
import { createHabit } from "@/utils/habits";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SetStateAction, useState } from "react";
import { StyleSheet, Switch, TextInput, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

export default function CreateHabit() {
  const queryClient = useQueryClient();

  // For habits
  const { data: categories, error: categoriesError } = useQuery({
    queryKey: ["category"],
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
        queryKey: ["habits"],
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
    <View>
      <TextInput
        value={habitName}
        onChangeText={setHabitname}
        placeholder="Habit name"
        style={styles.textInput}
        placeholderTextColor={"white"}
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Habit Description"
        style={styles.textInput}
        placeholderTextColor={"white"}
      />
      <View style={styles.switch}>
        <ThemedText>Is this habit daily / on some days?</ThemedText>
        <Switch value={isDaily} onValueChange={() => setIsDaily(!isDaily)} />
      </View>
      {!isDaily && <DaySelector onSelectedDaysChange={handleDaysChange} />}
      <ThemedText>Select Category</ThemedText>
      <SelectList
        boxStyles={{ marginVertical: 10 }}
        dropdownTextStyles={styles.boxStyles}
        dropdownStyles={{ marginBottom: 10 }}
        inputStyles={styles.boxStyles}
        setSelected={(val: SetStateAction<number | undefined>) =>
          setCategoryId(val)
        }
        data={data}
        save="key"
      />
      {/* Only open when daily not selected */}
      <ThemedButton label="Create new habit" onPress={onPressCreateHabit} />
      {categoriesError && (
        <ThemedText type="error">{categoriesError.message}</ThemedText>
      )}
    </View>
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
