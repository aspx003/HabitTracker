import ThemedButton from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { createCategory } from "@/utils/categories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function CreateCategory() {
  const queryClient = useQueryClient();

  // For categories
  const [categoryName, setCategoryName] = useState("");
  const [color, setColor] = useState("");

  const { mutate, error } = useMutation({
    mutationFn: ({ name, color }: { name: string; color: string }) =>
      createCategory(name, color),
    onSuccess: () => {
      setCategoryName("");
      setColor("");
      queryClient.invalidateQueries({
        queryKey: ["category"],
      });
    },
  });

  const category = async () => {
    if (categoryName && color) {
      mutate({
        name: categoryName,
        color,
      });
    }
  };

  return (
    <View>
      <ThemedText type="default" style={styles.text}>
        Add Categories
      </ThemedText>

      {/* Create a category */}
      <TextInput
        value={categoryName}
        onChangeText={setCategoryName}
        placeholder="Category name"
        style={styles.textInput}
        placeholderTextColor={"white"}
      />
      <TextInput
        value={color}
        onChangeText={setColor}
        placeholder="Category color"
        style={styles.textInput}
        placeholderTextColor={"white"}
      />
      <ThemedButton label="Add new category" onPress={category} />
      {error && <ThemedText type="error">{error.message}</ThemedText>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
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
});
