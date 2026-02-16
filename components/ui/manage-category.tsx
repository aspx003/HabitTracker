import { View, Text, Pressable } from "react-native";
import React from "react";
import { CATEGORY_KEY } from "@/constants/storage-constants";
import { deleteCategory, getCatgeories } from "@/utils/categories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/theme";
import { FlashList } from "@shopify/flash-list";
import Box from "../box";
import ThemedText from "../themed-text";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function ManageCategory() {
  const queryClient = useQueryClient();
  const theme = useTheme<Theme>();

  const categories = useQuery({
    queryKey: [CATEGORY_KEY],
    queryFn: getCatgeories,
  });

  const categoryMutation = useMutation({
    mutationFn: ({ id }: { id: number }) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CATEGORY_KEY],
      });
    },
  });

  return (
    <Box flex={1}>
      <FlashList
        data={categories.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Box
            backgroundColor={"surface"}
            padding={"m"}
            marginVertical={"s"}
            borderRadius={10}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <ThemedText variant={"subheader"}>{item.name}</ThemedText>
            </Box>
            <Pressable onPress={() => categoryMutation.mutate({ id: item.id })}>
              <AntDesign name="delete" size={24} color={theme.colors.alert} />
            </Pressable>
          </Box>
        )}
      />
    </Box>
  );
}
