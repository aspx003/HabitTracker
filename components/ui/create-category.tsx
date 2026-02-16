import ThemedButton from "@/components/themed-button";
import { createCategory } from "@/utils/categories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Box from "../box";
import ThemedInput from "../themed-input";
import ThemedText from "../themed-text";

export default function CreateCategory() {
  const queryClient = useQueryClient();
  const [categoryName, setCategoryName] = useState("");

  const { mutate, error } = useMutation({
    mutationFn: ({ name }: { name: string }) => createCategory(name),
    onSuccess: () => {
      setCategoryName("");
      queryClient.invalidateQueries({
        queryKey: ["category"],
      });
    },
  });

  const category = async () => {
    if (categoryName) {
      mutate({
        name: categoryName,
      });
    }
  };

  return (
    <Box gap={"m"}>
      <ThemedText variant={"subheader"}>Add Categories</ThemedText>
      <ThemedInput
        value={categoryName}
        onChangeText={setCategoryName}
        placeholder="Category name"
      />
      <ThemedButton label="Add new category" onPress={category} />
      {error && <ThemedText variant={"error"}>{error.message}</ThemedText>}
    </Box>
  );
}
